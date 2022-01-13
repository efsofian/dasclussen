export const singleItemOnCart = (currentlist, newitem) => {
    const existingItem = currentlist.find(itemOnList => itemOnList.id === newitem.id);

    if (existingItem) {
        return currentlist.map(itemOnlist => itemOnlist.id === newitem.id ? { ...itemOnlist, quantity: itemOnlist.quantity + 1 }
            : itemOnlist);
        }


        return [...currentlist, {...newitem, quantity: 1}]

    
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    const existingCartItem = cartItems.find(item => item.id === cartItemToRemove.id);
    console.log(existingCartItem);
    if (existingCartItem.quantity === 1) {
        return cartItems.filter(item => item.id !== cartItemToRemove.id);
    } else {
        return cartItems.map(item => {
            if (item.id === cartItemToRemove.id) {
                return {...item, quantity: item.quantity - 1};
            } else {
                return item;
            }
        });
    }
}