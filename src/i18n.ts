import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      pl: {
        translation: {
          // Add translations here if needed, or use inline strings as in the exported Hero
        }
      },
      en: {
        translation: {
          // Add translations here
        }
      }
    },
    lng: 'pl',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
