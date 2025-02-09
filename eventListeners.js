import {
    productContainer,
    categorySelectDropdown,
    showAllProducts,
    addProductLink,
    addProductModal,
    editProductModal,
    addProductButton,
    changeThemeButton,
    limitCardsDropdown,
    updateProdButton,
    updateProductForm,
} from './domElements.js'
import {
    updateProductCards,
    getProductsAll,
    getProductsLimit,
    getProductByCategory,
    addNewProduct,
    updateProduct,
    deleteProduct,
    showProductDetails,
} from './apis.js';

categorySelectDropdown.addEventListener('click',(e)=>{
    if(e.target.classList.contains('dropdown-item')){
        const categorySelected = e.target.closest('.dropdown-item').textContent;
        console.log(categorySelected);
        getProductByCategory(categorySelected);
    }
});
productContainer.addEventListener('click',(e)=>{
    const selectedProduct = e.target.closest('.card');
    const retrieveData = JSON.parse(localStorage.getItem('productData')).filter((el)=>el.image === selectedProduct.childNodes[1].src);
    if(e.target.classList.contains('btn-secondary')){
        updateProductCards(retrieveData);
    }
    if(e.target.classList.contains('btn-danger')){
        
        deleteProduct(retrieveData);
    }
    if(e.target.classList.contains('btn-warning')){
        showProductDetails(retrieveData);
    }
});
updateProdButton.addEventListener('click',()=>{   
    const updatedProduct = {
        id : localStorage.getItem('updateProductId'),
        title :updateProductForm.elements.updateProdTitle.value ,
        price : updateProductForm.elements.updateProdPrice.value ,
        description : updateProductForm.elements.updateProdDescription.value  ,
        image : updateProductForm.elements.updateProdImage.value ,
        category : updateProductForm.elements.updateProdCategory.value,
        rating : {
            rate : updateProductForm.elements.updateProdRating.value
        }
    }
    updateProduct(updatedProduct);
    
    editProductModal.hide();

});
addProductButton.addEventListener('click',()=>{
    const prod_data = {
        title: document.querySelector('#prod-title').value,
        id: JSON.parse(localStorage.getItem('productData')).length+1,
        description : document.querySelector('#prod-description').value,
        image : document.querySelector('#prod-image').value,
        category : document.querySelector('#prod-category').value,
        price :document.querySelector('#prod-price').value,
        rating : {
            rate : document.querySelector('#prod-rating').value,
        }
    }
    addNewProduct(prod_data);
    addProductModal.hide();
});
showAllProducts.addEventListener('click',()=>{
    getProductsAll();
});
addProductLink.addEventListener('click',()=>{
    addProductModal.show();
});
changeThemeButton.addEventListener('click',(e)=>{
    e.preventDefault();
    document.querySelector('html').getAttribute('data-bs-theme') === 'dark' ? document.querySelector('html').setAttribute('data-bs-theme','light'): document.querySelector('html').setAttribute('data-bs-theme','dark');
});

limitCardsDropdown.addEventListener('click',(e)=>{
    e.preventDefault();
    const selectedLimit = e.target.closest('a');
    const limit = selectedLimit.textContent;
    if(e.target.classList.contains('dropdown-item')){
        getProductsLimit(limit);
    }
})
