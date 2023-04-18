import React from 'react';

const Register = () => {
    return (
        <div>
            <h1 className='my-5'>This is Register Page</h1>
            <div>
                <form>
                    <input className='form-control' type="email" id='email' placeholder='Enter Your email' />
                    <input className='form-control my-3' type="password" placeholder='******' />
                    <input className='form-control bg-info' type="submit" value="Register" />
                </form>
            </div>
        </div>
    );
};

export default Register;