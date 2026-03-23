import { Controller, Get, Param } from '@nestjs/common';

@Controller('translations')
export class TranslationController {
  private translations = {
    en: {
      submit: 'Submit',
      firstName: 'First Name',
      lastName: 'Last Name',
      required: '{{field}} is required',
      emailInvalid: 'Email must be a valid email.'
    },
    de: {
      submit: 'Absenden',
      firstName: 'Vorname',
      lastName: 'Nachname',
      required: '{{field}} ist erforderlich',
      emailInvalid: 'E-Mail muss eine gültige E-Mail-Adresse sein.'
    }
  };

  @Get(':lang')
  getTranslation(@Param('lang') lang: string) {
    return this.translations[lang] || this.translations['en'];
  }
}