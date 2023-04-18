import React, { useState } from 'react';
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import app from '../../Firebase/Firebase.config';

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
        const regularExpression = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        if (!regularExpression.test(password)) {
            setError('Password has at least one number, one special charecter etc');
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then( result => {
                const loggedInUser = result.user;
                console.log(loggedInUser);
                setSuccess('User has been created successfully!');
            })
            .catch(err => setError(err.message))
    }

    return (
        <div>
            <h1 className='my-5'>This is Register Page</h1>
            <div>
                <form onSubmit={handleSubmit}>
                    <input className='form-control' required type="email" id='email' placeholder='Enter Your email' />
                    <input className='form-control my-3' required type="password" id='password' placeholder='******' />
                    <input className='form-control bg-info mb-3' type="submit" value="Register" />
                </form>
                <p className='text-success'>{success}</p>
                <p className='text-danger'>{error}</p>
            </div>
        </div>
    );
};

export default Register;