import React, { useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification } from "firebase/auth";
import app from '../../Firebase/Firebase.config';
import { Link } from 'react-router-dom';

const Register = () => {

    const auth = getAuth(app);

    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (event) => {

        event.preventDefault();
        setSuccess('');
        setError('');

        const email = event.target.email.value;
        const password = event.target.password.value;

        // Password Validation with regular expression
        if (!/(?=.*[0-9])/.test(password)) {
            setError('Password should have at least one number');
            return;
        }
        else if (password.length < 8) {
            setError('Your password must be at least 8 characters');
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then( result => {
                const loggedInUser = result.user;
                // console.log(loggedInUser);
                event.target.reset();
                emailVarification(loggedInUser);
                setSuccess('User has been created successfully!');
            })
            .catch(err => setError(err.message))        
    }

    const emailVarification = user => {
        sendEmailVerification(user)
            .then( result => {
                console.log(result);
                alert('Email verification sent!');
            })
            .catch(err => setError(err.message))
    }

    return (
        <div>
            <h1 className='my-5'>-- Register --</h1>
            <div>
                <form onSubmit={handleSubmit}>
                    <input className='form-control' required type="email" id='email' placeholder='Enter Your email' />
                    <input className='form-control my-3' required type="password" id='password' placeholder='******' />
                    <input className='form-control bg-info mb-3' type="submit" value="Register" />
                </form>
                <p><small>Already have an account? <Link to="/login">Login</Link></small></p>
                <p className='text-success'>{success}</p>
                <p className='text-danger'>{error}</p>
            </div>
        </div>
    );
};

export default Register;