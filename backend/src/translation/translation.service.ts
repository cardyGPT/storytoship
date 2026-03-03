import { Injectable, Logger, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Translation } from './entities/translation.entity';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Injectable()
export class TranslationService {
  private readonly logger = new Logger(TranslationService.name);
  private openai: OpenAI;

  constructor(
    @InjectRepository(Translation)
    private translationRepo: Repository<Translation>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private config: ConfigService,
  ) {
    this.openai = new OpenAI({ apiKey: this.config.get('OPENAI_API_KEY') });
  }

  async translate(text: string, lang: string, type: 'error' | 'field' = 'field'): Promise<string> {
    const cacheKey = `trans:${lang}:${text}`;
    
    // 1. Check Redis (L1)
    const cached = await this.cacheManager.get<string>(cacheKey);
    if (cached) return cached;

    // 2. Check Database (L2)
    const dbEntry = await this.translationRepo.findOne({ where: { sourceText: text, targetLang: lang } });
    if (dbEntry) {
      await this.cacheManager.set(cacheKey, dbEntry.translatedText);
      return dbEntry.translatedText;
    }

    // 3. Determine Provider & Translate
    let translated: string;
    let provider = 'llm';

    if (type === 'error' || text.length > 50) {
      translated = await this.translateWithLLM(text, lang);
    } else {
      translated = await this.translateWithStaticAPI(text, lang);
      provider = 'api';
    }

    // 4. Persistence
    const newEntry = this.translationRepo.create({
      sourceText: text,
      targetLang: lang,
      translatedText: translated,
      provider,
    });
    await this.translationRepo.save(newEntry);
    await this.cacheManager.set(cacheKey, translated);

    return translated;
  }

  private async translateWithLLM(text: string, lang: string): Promise<string> {
    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: `You are a professional translator for a SaaS enterprise platform. Translate the following text to ${lang}. Maintain technical context.` },
          { role: 'user', content: text }
        ],
      });
      return response.choices[0].message.content.trim();
    } catch (err) {
      this.logger.error('LLM Translation failed', err);
      return text; // Fallback to source
    }
  }

  private async translateWithStaticAPI(text: string, lang: string): Promise<string> {
    // Mocking DeepL/Google API call
    return `[Mock Trans: ${lang}] ${text}`;
  }
}