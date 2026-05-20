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

i18n.locale = getLocales()[0].languageCode ?? 'en';


i18n.enableFallback = true;


export default i18n
