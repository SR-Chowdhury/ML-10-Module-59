import React, { useRef, useState } from 'react';
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { Link } from 'react-router-dom';
import app from '../../Firebase/Firebase.config';

const auth = getAuth(app);

const Login = () => {

    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const emailRef = useRef();

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;

        const email = form.email.value;
        const password = form.password.value;

        // password validation
        setSuccess('');
        setError('');

        if (!/(?=.*[0-9])/.test(password)) {
            setError('Password should have at least one number');
            setSuccess('');
            return;
        }
        else if (password.length < 8) {
            setError('Your password must be at least 8 characters');
            setSuccess('');
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
            .then( result => {
                const loggedInUser = result.user;
                // console.log(loggedInUser)
                setSuccess('Successfully Logged In');
                setError('');
            })
            .catch(err => setError(err.message))

    }

    const handleResetPassword = () => {
        const email = emailRef.current.value;
        if (!email) {
            alert('Please enter an email address');
            return;
        }

        sendPasswordResetEmail(auth, email)
            .then( () => {
                setSuccess('');
                setError('');
                alert('Password reset email sent!');
            })
            .catch(err => setError(err.message))
    }

    return (
        <div>
            <h1 className='my-5'>-- Login --</h1>
            <div>
                <form onSubmit={handleSubmit}>
                    <input className='form-control' name='email' required type="email" ref={emailRef} id='email' placeholder='Enter Your email' />
                    <input className='form-control my-3' name='password' required type="password" id='password' placeholder='******' />
                    <input className='form-control bg-info mb-3' type="submit" value="Login" />
                </form>
                <p><small>Forgot your password? <button onClick={handleResetPassword} className='btn btn-link'>Reset Password</button></small></p>
                <p><small>New in this website? <Link to="/register">Register</Link></small></p>
                <p className='text-success'>{success}</p>
                <p className='text-danger'>{error}</p>
            </div>
        </div>
    );
};

export default Login;