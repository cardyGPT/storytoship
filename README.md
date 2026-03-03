# Cardinality A11y Grid

This project implements a WCAG 2.1 Level AA compliant DevExtreme Grid.

## Compliance Features
- **ARIA Roles**: Custom directive injects `grid`, `row`, and `gridcell`.
- **Focus Management**: High-visibility focus indicators via CSS.
- **Screen Reader Feedback**: Uses Angular CDK `LiveAnnouncer` for dynamic updates.
- **Keyboard Navigation**: Native DevExtreme keyboard support enhanced with logical tab order.

## Commands
- `docker-compose up`: Launch the full environment.
- Backend: http://localhost:3000/api
- Frontend: http://localhost:4200