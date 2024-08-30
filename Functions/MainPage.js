searchElement = document.querySelector(".search-js");

searchElement.addEventListener('input', (e) => {
    generateMainBody(e.target.value);
})

function generateMainBody(seachInput) {
    const ItemGridElement = document.querySelector('.items-grid');
    let MainBodyhtml = '';
    items.forEach((item) => {
        if(item.name.toLowerCase().includes(seachInput.toLowerCase())){
        MainBodyhtml += `<div class="item-block">
                    <div class="image-block">
                        <img src="${item.image}">
                    </div>
                    <div class="item-name">
                        ${item.name}
                    </div>
                    <div class="item-ratings">
                        <div class="rating-quality">
                            <img src="Items/ratings/rating-${item.rating.stars*10}.png">
                        </div>
                        <div class="rating-quantity">${item.rating.count}</div>
                    </div>
                    <div class="item-price">
                        &#8377;${((item.priceCents/100)*80).toFixed(2)}
                    </div>
                    <div class="item-quantity">
                        <select class="quantity-select" data-item-id="${item.id}">
                            <option selected value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>
                    </div>
                    <div class="item-add-filter">

                    </div>
                    <div class="item-added">
                        <img src="Images/checkmark.png">
                        Added
                    </div>
                    <button class="add-to-cart-btn add-to-cart-js" data-item-id="${item.id}">Add to Cart</button>
                </div>`;
    }})
    ItemGridElement.innerHTML = MainBodyhtml; 
}



generateMainBody("");



const CartQuantityElement = document.querySelector('.cart-quantity-js');

const buttonElements = document.querySelectorAll('.add-to-cart-js');

if(updateCartQuantity() != 0){
    CartQuantityElement.innerHTML = updateCartQuantity();
}


searchElement = document.querySelector(".search-js");





buttonElements.forEach((item) => {
    item.addEventListener('click', () => {
        let itemId = item.dataset.itemId;
        const selectElement = document.querySelector(`.quantity-select[data-item-id="${itemId}"]`);
        const selectedQuantity = Number(selectElement.value);

        addtocart(itemId, selectedQuantity);
        CartQuantityElement.innerHTML = updateCartQuantity();
    })
})



