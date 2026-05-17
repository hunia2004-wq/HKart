import { getLocales } from 'expo-localization';
import { I18n } from 'i18n-js';


// Set the key-value pairs for the different languages you want to support.
const translations = {
  en: {
  addToCart: 'Add to Cart',
  addToWishlist: 'Add to Wishlist',
  outOfStock: 'Out of Stock',
  loading: 'Loading...',
  products: 'Products',
},
fr: {
  addToCart: 'Ajouter au panier',
  addToWishlist: 'Ajouter à la liste de souhaits',
  outOfStock: 'Rupture de stock',
  loading: 'Chargement..',
  products:'Produits',
}
};
const i18n = new I18n(translations);

// Set the locale once at the beginning of your app.
i18n.locale = getLocales()[0].languageCode ?? 'en';

// When a value is missing from a language it'll fall back to another language with the key present.
i18n.enableFallback = true;
// To see the fallback mechanism uncomment the line below to force the app to use the Japanese language.
// i18n.locale = 'ja';

export default i18n
