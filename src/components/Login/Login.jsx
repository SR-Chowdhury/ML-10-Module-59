import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {

    const auth = getAuth();

    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

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
            return;
        }
        else if (password.length < 8) {
            setError('Your password must be at least 8 characters');
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
            .then( result => {
                const loggedInUser = result.user;
                console.log(loggedInUser)
                setSuccess('Successfully Loged In');
            })
            .catch(err => setError(err.message))

    }

    return (
        <div>
            <h1 className='my-5'>-- Login --</h1>
            <div>
                <form onSubmit={handleSubmit}>
                    <input className='form-control' name='email' required type="email" id='email' placeholder='Enter Your email' />
                    <input className='form-control my-3' name='password' required type="password" id='password' placeholder='******' />
                    <input className='form-control bg-info mb-3' type="submit" value="Register" />
                </form>
                <p className='text-success'>{success}</p>
                <p className='text-danger'>{error}</p>
            </div>
        </div>
    );
};

export default Login;