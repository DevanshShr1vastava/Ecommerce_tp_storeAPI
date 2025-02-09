import {
    getProductsAll, 
    getAllCategories,
} from './apis.js';

import './eventListeners.js'

localStorage.setItem('updateProductId',0);
document.addEventListener('DOMContentLoaded',()=>{
    
    getProductsAll();
    getAllCategories();
})
