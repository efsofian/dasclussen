import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions';
import './sign-in.styles.scss';

const SignIn = () => {
    const dispatch = useDispatch();
    const [userCredentials, setCredentials] = useState({
        email: '',
        password: '',
    });
    const { email, password } = userCredentials;
    const handleChange = (e) => {
        const { value, name } = e.target;
        setCredentials({...userCredentials, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(emailSignInStart(email, password));  
    }
    return (
        <div className="sign-in">
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput name="email" type="email" value={email} handleChange={handleChange} label="email" required />
                <FormInput name="password" type="password" value={password} onChange={handleChange} label="password" required />
                <div className="buttons">
                    <CustomButton type="submit">Sign In</CustomButton>
                    <CustomButton type="button" isGoogleSignIn onClick={() => dispatch(googleSignInStart())}>Sign In with Google</CustomButton>
                </div>
            </form>
        </div>
    );
}

export default SignIn;