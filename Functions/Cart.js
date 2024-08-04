let cart = JSON.parse(localStorage.getItem('cart'));

if(!cart){
    cart = [];
}



function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function addtocart(itemId){
    let existingItem;
    cart.forEach((item) => {
        if(item.Id === itemId){
            existingItem = item;
        }
    })

    if(existingItem){
        existingItem.quantity += 1;
    }else{
        cart.push({
            Id : itemId,
            quantity : 1
        })
    }

    saveToStorage();
}


function deleteFromCart(itemid){
    let newCart = [];
    
    cart.forEach((cartItem) => {
        if(cartItem.Id != itemid){
            newCart.push(cartItem);
        }
    });

    cart = newCart;
    const total = updateCartQuantity();
    cartCountEl.innerHTML = `${total} items`;
    saveToStorage();
}

let cartEl = document.querySelector('.cart-quantity-js');

function updateCartQuantity(){
    let totalCartItems = 0;
    cart.forEach((item) => {
        totalCartItems += item.quantity;
    });
    if(totalCartItems >= 10){
        if(cartEl){
            document.querySelector('.cart-quantity-js').classList.add('cart-quantity-high');
            document.querySelector('.cart-quantity-js').classList.remove('cart-quantity');   
        }
    }

    
    return totalCartItems;
}