import {
    productContainer,
    categorySelectDropdown,
    editProductModal,
    showProductModal,
    updateProductForm,
    showProductModalImage,
    showProductModalTitle,
    showProductModalDescription,
    showProductModalPrice,
    showProductModalRating,
    showProductModalCategory,
    showAlert
} from './domElements.js'

export const createProductCards = ()=>{
    productContainer.innerHTML = ``;
    let row;
    const productData = JSON.parse(localStorage.getItem('productData'));
    row = document.createElement('div');
    row.className = 'row row-cols-1 row-cols-md-3 g-4 mb-4';
 
    productContainer.appendChild(row);
    for(let i = 0;i<productData.length;i++){
        const columnCard = document.createElement('div');
        columnCard.className='col'
        columnCard.innerHTML = `            
            <div class="card h-100">
                <img src="${productData[i].image}" class="card-img-top img-thumbnail img-fluid" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${productData[i].title}  </h5>
                    <p class="card-text card-text-truncate">${productData[i].description} </p>
                    <button class='btn btn-warning'>Show Details</button>
                </div>
                <div class="card-footer text-center">
                    <div class="row">
                        <div class="col align-self-start">
                        <small class="text-body-secondary">Rating : ${productData[i].rating.rate}</small> 
                            <small class="text-body-secondary">Price : $${productData[i].price}</small>
                        </div>
                        <div class="col align-self-end">
                            <button data-bs-toggle="modal" data-bs-target="#edit-modal" class = "btn btn-secondary btn-sm">✏️Edit</button>
                            <button class = "btn btn-danger btn-sm">🗑️Delete</button>

                        </div>
                    </div>
                </div>
            </div>           
        `;
        row.appendChild(columnCard);
    }      
}
export const showProductDetails = (prodData)=>{

    showProductModalImage.src = prodData[0].image;
    showProductModalTitle.textContent = prodData[0].title;
    showProductModalDescription.textContent = prodData[0].description;
    showProductModalPrice.textContent = `Price : ${prodData[0].price}`;
    showProductModalRating.textContent = `Rating : ${prodData[0].rating.rate}`;
    showProductModalCategory.textContent = `Category : ${prodData[0].category}`
    showProductModal.show();
}
export const updateProductCards = (prodData)=>{
    localStorage.setItem('updateProductId',prodData[0].id);
   
    updateProductForm.elements.updateProdTitle.value = prodData[0].title;
    updateProductForm.elements.updateProdPrice.value = prodData[0].price;
    updateProductForm.elements.updateProdRating.value = prodData[0].rating.rate;
    updateProductForm.elements.updateProdCategory.value = prodData[0].category;
    updateProductForm.elements.updateProdImage.value = prodData[0].image;
    updateProductForm.elements.updateProdDescription.value = prodData[0].description;
    editProductModal.show();
}
export const getProductsAll = async()=>{
    try{
        const response = await fetch('https://fakestoreapi.com/products')
        const allProductData = await response.json();
        localStorage.setItem('productData',JSON.stringify(allProductData));
        console.log(JSON.parse(localStorage.getItem('productData')));
        console.log('all cards added to product page');
        createProductCards();
    }
    catch(err){
        console.error(err);
    }
}

export const getProductsLimit = async(limit)=>{
    try{
        const response = await fetch(`https://fakestoreapi.com/products?limit=${limit}`)
        const limitProductData = await response.json();
        localStorage.setItem('productData',JSON.stringify(limitProductData));
        console.log('adding cards to product page');
        createProductCards();
    }
    catch(err){
        console.error(err);
    }
}

export const getAllCategories = async()=>{
    try{

        const response = await fetch('https://fakestoreapi.com/products/categories')
        const categoryData = await response.json();     
        categoryData.forEach((category)=>{
            const dropDownCategoryElement = document.createElement('li');
            dropDownCategoryElement.innerHTML = `<a class="dropdown-item" href="#">${category}</a>`
            categorySelectDropdown.appendChild(dropDownCategoryElement);
        })
    }
    catch(err){
        console.error(err);
    }
}

export const getProductByCategory = async(category)=>{
    try{
        const response = await fetch(`https://fakestoreapi.com/products/category/${category}`);
        const categoryProductData = await response.json();
        localStorage.setItem('productData',JSON.stringify(categoryProductData));
        console.log('switching cards to product page based on category : ',category);
        createProductCards();
    }
    catch(err){
        console.error(err);
    }
}

export const appendAlert = (message, type) => {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
      `<div class="alert alert-${type} alert-dismissible" role="alert">`,
      `   <div>${message}</div>`,
      '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
      '</div>'
    ].join('')
  
    showAlert.append(wrapper)
  }

export const addNewProduct = async(postData)=>{
    try{

        const response = await fetch('https://fakestoreapi.com/products',{
            method:"POST",
            body:JSON.stringify(postData)
        })
        const data = await response.json();
        const status = response.status;
        const allProductData = JSON.parse(localStorage.getItem('productData'));
        allProductData.unshift(postData);
        localStorage.setItem('productData',JSON.stringify(allProductData));
        createProductCards();
        appendAlert(`Product Added successfully with status : ${status}`,'success');
        document.getElementById('add-product-form').reset();
        console.log(postData);
    }
    catch(err){
        console.error(err);
    }
}

export const updateProduct = async(updatedData)=>{
    try{

        const response = await fetch(`https://fakestoreapi.com/products/${localStorage.getItem('updateProductId')}`,{
            method : "PATCH",
            body : JSON.stringify(updatedData)
        });
        const data = await response.json();
        const status = response.status;
        const allProductData = JSON.parse(localStorage.getItem('productData'));
        const updateProductId = Number(localStorage.getItem('updateProductId'));
        
        const updateProductIndex = allProductData.findIndex(el => Number(el.id) === updateProductId);
         
        allProductData.splice(updateProductIndex,1,updatedData);
        localStorage.removeItem('updateProductId');
        localStorage.setItem('productData',JSON.stringify(allProductData));
        createProductCards();
        appendAlert(`Product Updated successfully with status : ${status}`,'warning');
        console.log(data.message);
    }
    catch(err){
        console.error(err);
    }
}

export const deleteProduct = async(productToDelete) =>{
    try{
        const response = await fetch(`https://fakestoreapi.com/products/${Number(productToDelete[0].id)}`,{
            method:"DELETE",
            body:JSON.stringify(productToDelete)
        })
        const data = await response.json();
        const status = response.status;
        const allProductData = JSON.parse(localStorage.getItem('productData'));
        const productToDeleteIndex = allProductData.indexOf(
            allProductData.find(el=>Number(el.id)===Number(productToDelete[0].id))
        );
        allProductData.splice(productToDeleteIndex,1);
        localStorage.setItem('productData',JSON.stringify(allProductData));
        appendAlert(`Product Removed Successfully with status : ${status}`,'danger');
        createProductCards();
        console.log(data);
    }
    catch(err){
        console.error(err);
    }
}

