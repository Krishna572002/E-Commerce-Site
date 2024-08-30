let ordersGridElement = document.querySelector(".orders-grid");


let eachOrderDetailsElement = document.querySelector(".order-details-grid");

let getProductsButton = document.querySelector(".get-products-button")

getProductsButton.addEventListener('click', () => {
  rererender("")

})

let searchElement = document.querySelector(".search-js");
let searchInput = "";

searchElement.addEventListener('input', (e) => {
    searchInput = e.target.value;
    rererender();
})





let cartquantityElement = document.querySelector(".cart-quantity-js")
cartquantityElement.innerHTML = updateCartQuantity();


function rererender(){
  let ordersGridElement = document.querySelector(".orders-grid");
  let totalOrderhtml = "";

  ordersCart.forEach((each) => {
    if(generateEachProduct(each.orderitems) != ""){
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
      `}
  })
  ordersGridElement.innerHTML = totalOrderhtml;
}



rererender();


function parseDate(dateStr) {
  return new Date(`2024 ${dateStr}`);
}





function generateEachProduct(obj){
    let eachOrderHtml = "";
    obj.forEach((each) => {
      if(each.name.toLowerCase().includes(searchInput.toLocaleLowerCase())){

        if(parseDate(findDate(0)) <= parseDate(each.arrivingOn)){
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
          `}
    }})
    return eachOrderHtml;
}








