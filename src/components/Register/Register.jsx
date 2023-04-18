import React, { useState } from 'react';

const Register = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {

        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        // console.log(email, password)
        // setEmail(email);
        // setPassword(password);
    }

    return (
        <div>
            <h1 className='my-5'>This is Register Page</h1>
            <div>
                <form onSubmit={handleSubmit}>
                    <input className='form-control' type="email" id='email' placeholder='Enter Your email' />
                    <input className='form-control my-3' type="password" id='password' placeholder='******' />
                    <input className='form-control bg-info' type="submit" value="Register" />
                </form>
            </div>
        </div>
    );
};

export default Register;