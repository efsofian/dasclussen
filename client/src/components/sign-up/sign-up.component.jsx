import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { signUpStart } from '../../redux/user/user.actions';
import './sign-up.styles.scss';

const SignUp = () => {
    const dispatch = useDispatch();
    const [userCredentials, setUserCredentials] = useState({
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserCredentials({...userCredentials, [name]: value});
    }
    const { displayName, email, password, confirmPassword } = userCredentials;
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!(password === confirmPassword)) {
            alert("passwords don't match");
            return;
        }
        dispatch(signUpStart({ displayName, email, password }));
    }
    return (
        <div className="sign-up">
            <h2 className="title">I do not have an account</h2>
            <span>Sign up with your email and password</span>
            <form className="sign-up-form" onSubmit={handleSubmit}>
                <FormInput type="text" name="displayName" value={displayName} onChange={handleChange} label="Display Name" required></FormInput>
                <FormInput type="email" name="email" value={email} onChange={handleChange} label="Email" required></FormInput>
                <FormInput type="password" name="password" value={password} onChange={handleChange} label="Password" required></FormInput>
                <FormInput type="password" name="confirmPassword" value={confirmPassword} onChange={handleChange} label="Confirm password" required></FormInput>
                <CustomButton type="submit">SIGN UP</CustomButton>
            </form>
        </div>
    );
}

export default SignUp;