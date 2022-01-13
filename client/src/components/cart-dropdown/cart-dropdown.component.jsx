import React from 'react';
import CartItem from '../cart-item/cart-item.component';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { toggleCartHidden } from '../../redux/cart/cart.actions';
import { CartDropdownContainer, CartDropdownButton, EmptyMessageContainer, CartItemsContainer  } from './cart-dropdown.styles';

const CartDropdown = () => {
    const cartItems = useSelector(selectCartItems);
    const dispatch = useDispatch();
    const history = useHistory();
    return (
        <CartDropdownContainer>
            <CartItemsContainer>
                {
                    cartItems.length ?
                        cartItems.map(item => (
                            <CartItem key={item.id} item={item} />))
                        :
                        <EmptyMessageContainer>Your cart is empty</EmptyMessageContainer>
                }
            </CartItemsContainer>
            <CartDropdownButton onClick={() => {
                dispatch(toggleCartHidden());
                history.push('/checkout');
            }}>GO TO CHECKOUT</CartDropdownButton>
        </CartDropdownContainer>
    );
}

export default CartDropdown;