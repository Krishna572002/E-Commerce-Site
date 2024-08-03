let cart = JSON.parse(localStorage.getItem('cart'));

if(!cart){
    cart = [{
        Id : "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity : 2
    },{
        Id : "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity : 1
    }];
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
    saveToStorage();
}