let ordersGridElement = document.querySelector(".orders-grid");


let eachOrderDetailsElement = document.querySelector(".order-details-grid");


function rererender(){
    let totalOrderhtml = "";

ordersCart.forEach((each) => {
    totalOrderhtml += `
        <div class="order-container">

          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${each.ordersPlaced}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>${each.total}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${each.orderId}</div>
            </div>
          </div>

          <div class="order-details-grid">
            ${generateEachProduct(each.orderitems)}
          </div>
        </div>
    `
})
ordersGridElement.innerHTML = totalOrderhtml;
}



rererender();




export function generateEachProduct(obj){
    let eachOrderHtml = "";
    obj.forEach((each) => {
        eachOrderHtml += `
            <div class="product-image-container">
                <img src=${each.image}>
            </div>
    
            <div class="product-details">
                <div class="product-name">
                    ${each.name}
                </div>
                <div class="product-delivery-date">
                    Arriving on: ${each.arrivingOn}
                </div>
                <div class="product-quantity">
                    Quantity: ${each.quantity}
                </div>
                
            </div>
    
            <div class="product-actions">
                
            </div>
        `
    })
    return eachOrderHtml;
}








