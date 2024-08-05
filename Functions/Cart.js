let cart = JSON.parse(localStorage.getItem('cart'));

if(!cart){
    cart = [
        {
            Id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity : 2,
            deliveryOptionid : '1'
        },
        {
            Id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
            quantity : 1,
            deliveryOptionid : '2'
        }
    ];
}



function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function getProduct(itemId){
    let existingItem;
    items.forEach((item) => {
        if(item.id === itemId){
            existingItem = item;
        }
    })
    return existingItem;
}

function getDeliveryOption(id){
    let deliveryMatched;
    deliveryOptions.forEach((eachdelivery) => {
        if(eachdelivery.id === id){
            deliveryMatched = eachdelivery;
        }
    })
    return deliveryMatched || deliveryOptions[0];
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
            quantity : 1,
            deliveryOptionid : '1'
        })
    }

    saveToStorage();
}

const cartCountEl = document.querySelector('.checkout-cartcount-js');
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


function updateDeliveryOption(productId, deliveryOptionid){
    let existingItem;
    cart.forEach((item) => {
        if(item.Id === productId){
            existingItem = item;
        }
    })

    existingItem.deliveryOptionid = deliveryOptionid;
    saveToStorage();
}



function renderPaymentSummay() {
    let productPrice = 0;
    let shippingCost = 0;
    cart.forEach((element) =>{
        const product = getProduct(element.Id)
        let price = ((product.priceCents/100)*80).toFixed(2) * element.quantity;
        productPrice += price;
        let eachDelivery = getDeliveryOption(element.deliveryOptionid);
        shippingCost += eachDelivery.price;
    })
    shippingCost = ((shippingCost/100)*80).toFixed(2);
    const totalBeforeTax = (productPrice + Number(shippingCost)).toFixed(2);
    let totalAfterTax = Number(totalBeforeTax) * 0.1;
    totalAfterTax = totalAfterTax.toFixed(2);
    const total = Number(totalAfterTax) + Number(totalBeforeTax)

    const paymentHtml = 
    `
        <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">&#8377;${productPrice.toFixed(2)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">&#8377;${shippingCost}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">&#8377;${totalBeforeTax}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">&#8377;${totalAfterTax}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">&#8377;${total.toFixed(2)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
    `

    document.querySelector('.payment-summary-js').innerHTML = paymentHtml;
}

