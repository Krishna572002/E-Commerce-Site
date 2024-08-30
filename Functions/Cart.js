

let cart = JSON.parse(localStorage.getItem('cart'));
let ordersCart = JSON.parse(localStorage.getItem('orders'));

if(!ordersCart){
    ordersCart = [];
}

if(!cart){
    cart = [];
}

function saveOrders(){
    localStorage.setItem('orders',JSON.stringify(ordersCart));
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
    const total = (Number(totalAfterTax) + Number(totalBeforeTax)).toFixed(2);

    const paymentHtml = 
    `
        <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${updateCartQuantity()}):</div>
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
            <div class="payment-summary-money">&#8377;${total}</div>
          </div>

        <a ${cart.length && 'href="orders.html"'}>
            <button onclick="generateOrdersPage(${total})" class="place-order-button  button-primary">
                Place your order
            </button>
        </a>
          
    `

    document.querySelector('.payment-summary-js').innerHTML = paymentHtml;
}

function findDate(add){
    const today = new Date();

    // Add the specified number of days
    today.setDate(today.getDate() + add);

    // Format the date as "Month Day"
    const options = { month: 'long', day: 'numeric' };
    return today.toLocaleDateString('en-US', options);
}

//Reerender needs to be fixed


function generateOrdersPage(total) {
    if(cart.length != 0){
        const temp = {};
        let orderplaceddate = findDate(0);
        temp.ordersPlaced = orderplaceddate;
        temp.orderId = generateRandomId();
        temp.total = total;
        let innertemp = [];
        cart.forEach((each) => {
            let obj = {};
            let itemDetails = getDesiredCartItem(each.Id);
            obj.image = itemDetails.image;
            obj.name = itemDetails.name;
            let arrivingon = findArrivingOn(each);
            obj.arrivingOn = arrivingon;
            obj.quantity = each.quantity;
            innertemp.push(obj);
        })
        temp.orderitems = innertemp;
        ordersCart.push(temp);
        saveOrders()
        console.log(ordersCart);
        cart = [];
        saveToStorage();
    }else{
        alert("Cart is Empty!");
    }
}





function findArrivingOn(cartItem){
    let daysRemain = 0;
    deliveryOptions.forEach((each) => {
        if(each.id === cartItem.deliveryOptionid){
            daysRemain = each.deliveryDays;
        }
    })
    return findDate(daysRemain);
}


function getDesiredCartItem(itemid) {
    let desiredItem = null;
    items.forEach((each) => {
        if(each.id === itemid){
            desiredItem = each;
        }
    })
    return desiredItem;
}

function generateRandomId() {
    return 'id-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
}











