import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          nav: {
            home: "Home",
            products: "Products",
            cart: "Cart",
            login: "Login"
          },
          common: {
            addToCart: "Add to Cart",
            checkout: "Checkout",
            total: "Total",
            price: "Price",
            quantity: "Quantity"
          },
          product: {
              sku: "SKU",
              category: "Category",
              description: "Description"
          }
        }
      },
      ar: {
        translation: {
          nav: {
            home: "الرئيسية",
            products: "المنتجات",
            cart: "السلة",
            login: "تسجيل الدخول"
          },
          common: {
            addToCart: "إضافة للسلة",
            checkout: "إتمام الشراء",
            total: "المجموع",
            price: "السعر",
            quantity: "الكمية"
          },
          product: {
              sku: "رقم المنتج",
              category: "التصنيف",
              description: "الوصف"
          }
        }
      }
    },
    lng: "ar", // Default
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
