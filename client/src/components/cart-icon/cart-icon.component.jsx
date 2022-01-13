import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CartIconContainer, ShoppingIcon, ItemCountContainer } from './cart-icon.styles';
import { toggleCartHidden } from '../../redux/cart/cart.actions';
import { selectCartItemsCount } from '../../redux/cart/cart.selectors';


const CartIcon = () => {
    const itemCount = useSelector(selectCartItemsCount);
    const dispatch = useDispatch();
    return (
        <CartIconContainer onClick={() => dispatch(toggleCartHidden())}>
            <ShoppingIcon />
            <ItemCountContainer>{itemCount}</ItemCountContainer>
        </CartIconContainer>
    );
}

export default CartIcon;