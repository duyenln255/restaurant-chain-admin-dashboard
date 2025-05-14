import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import en_translation from './locales/en/translation.json'
import vi_translation from './locales/vi/translation.json'

// Get user language preference or use default
const getUserLanguage = () => {
  const savedLanguage = localStorage.getItem('i18nextLng');
  return savedLanguage || 'vi'; // Default to Vietnamese if no preference found
};

i18next.use(initReactI18next).init({
  lng: getUserLanguage(),
  debug: true,
  resources: {
    en: {
      translation: en_translation
    },
    vi: {
      translation: vi_translation
    }
  },
  interpolation: {
    escapeValue: false // React already does escaping
  }
  // if you see an error like: "Argument of type 'DefaultTFuncReturn' is not assignable to paraproduct of type xyz"
  // set returnNull to false (and also in the i18next.d.ts options)
  // returnNull: false,
})

// Save language preference when it changes
i18next.on('languageChanged', (lng) => {
  localStorage.setItem('i18nextLng', lng);
});

export default i18next
