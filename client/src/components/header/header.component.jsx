import React, { Profiler } from "react";
import { useSelector, useDispatch } from "react-redux";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { selectCartHidden } from "../../redux/cart/cart.selectors";
import { ReactComponent as Logo } from "../../assets/crown.svg";
import {
	HeaderContainer,
	LogoContainer,
	OptionsContainer,
	OptionLink,
} from "./header.styles";
import { signOutStart } from "../../redux/user/user.actions";

const Header = () => {
	const currentUser = useSelector(selectCurrentUser);
	const hidden = useSelector(selectCartHidden);
	const dispatch = useDispatch();
	return (
		<Profiler
			id="headaa"
			onRender={(id, phase, actualDuration) => {
				console.log({
					id,
					phase,
					actualDuration,
				});
			}}>
			<HeaderContainer>
				<LogoContainer to="/">
					<Logo className="logo" />
				</LogoContainer>
				<OptionsContainer>
					<OptionLink to="/shop">Shop</OptionLink>
					<OptionLink to="/contact">Contact</OptionLink>
					{currentUser ? (
						<OptionLink
							as="div"
							to={"/"}
							onClick={() => {
								dispatch(signOutStart());
							}}>
							Sign out
						</OptionLink>
					) : (
						<OptionLink to="/signin">Sign in</OptionLink>
					)}
					<CartIcon />
				</OptionsContainer>
				{hidden ? null : <CartDropdown />}
			</HeaderContainer>
		</Profiler>
	);
};

export default Header;
