import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

// const today = dayjs();
// const deliveryDate = today.add(7, 'days');
// console.log(deliveryDate.format('dddd, MMMM D'));


function renderOrderSummary() {
  let checkoutHtml = '';


cart.forEach((cartItem) =>{
    let matchingItem;

    items.forEach((item) => {
        if(item.id === cartItem.Id){
            matchingItem = item;
        }
    })

    let deliveryOption;
    deliveryOptions.forEach((eachDelivery) => {
      if(eachDelivery.id === cartItem.deliveryOptionid){
        deliveryOption = eachDelivery;
      }
    })

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const datestring = deliveryDate.format('dddd, MMMM D');

    checkoutHtml += `<div class="cart-item-container container-js-${matchingItem.id}">
            <div class="delivery-date">
              Delivery Date: ${datestring}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingItem.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingItem.name}
                </div>
                <div class="product-price">
                  &#8377;${((matchingItem.priceCents/100)*80).toFixed(2)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary delete-item-js" data-item-id="${matchingItem.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                
                ${deliveryOptionsHtml(matchingItem, cartItem)}
                
              </div>
            </div>
          </div>`;
});


function deliveryOptionsHtml(matchingItem, item){
  let selectDeliverHtml = '';
  deliveryOptions.forEach((eachDelivery) => {
    const today = dayjs();
    let deliveryDate = today.add(eachDelivery.deliveryDays, 'days');
    deliveryDate = deliveryDate.format('dddd, MMMM D');
    let pricetag = eachDelivery.price;
    let pricetaghtml = '';
    if(pricetag === 0){
      pricetaghtml = 'FREE '
    }else{
      pricetaghtml = `&#8377;${((pricetag/100)*80).toFixed(2)} -`
    }

    const ischecked = eachDelivery.id === item.deliveryOptionid;
    selectDeliverHtml +=`
      <div class="delivery-option js-delivery-option" data-product-id = "${matchingItem.id}" data-delivery-option-id = ${eachDelivery.id}>
        <input type="radio" ${ischecked ? "checked" : ""}
          class="delivery-option-input"
          name="delivery-option-${matchingItem.id}">
        <div>
          <div class="delivery-option-date">
            ${deliveryDate}
          </div>
          <div class="delivery-option-price">
            ${pricetaghtml} Shipping
          </div>
        </div>
      </div>
    `
  })
  return selectDeliverHtml;
}


document.querySelector('.summary-js').innerHTML = checkoutHtml;

document.querySelectorAll('.delete-item-js').forEach((item) => {
    const itemId = item.dataset.itemId;
    item.addEventListener('click', () =>{
        deleteFromCart(itemId);
        console.log("deleted");
        
        const containerEl = document.querySelector(`.container-js-${itemId}`);
        containerEl.remove();
    })
})

let cartCountEl = document.querySelector('.checkout-cartcount-js');
const total = updateCartQuantity();
cartCountEl.innerHTML = `${total} items`;

document.querySelectorAll('.js-delivery-option').forEach((element) => {
  element.addEventListener('click', () =>{
    const {productId, deliveryOptionId} = element.dataset;
    updateDeliveryOption(productId, deliveryOptionId);
    renderOrderSummary();
  })
})
}

renderOrderSummary();