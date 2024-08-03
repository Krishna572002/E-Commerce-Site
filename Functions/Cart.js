const cart = [];

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
}