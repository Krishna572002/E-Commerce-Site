let MainBodyhtml = '';
items.forEach((item) => {
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
                    $${(item.priceCents/100).toFixed(2)}
                </div>
                <div class="item-quantity">
                    <select>
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
                <button class="add-to-cart-btn">Add to Cart</button>
            </div>`;
})

const ItemGridElement = document.querySelector('.items-grid');
ItemGridElement.innerHTML = MainBodyhtml; 