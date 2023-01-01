import React from 'react';
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom'
import ky from 'ky';



function validateEmail(value) {
    let error;
    if (!value) {
        error = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        error = 'Invalid email address';
    }
    return error;
}
function validateName(value) {
    let error;
    if (value === '') {
        error = 'Name is required';
    }
    return error;
}

function validatePassword(value) {
    let error;
    if (value === '') {
        error = 'Password is required';
    }
    return error;
}
export default function Login() {
    const navigate = useNavigate()

    return (
        <>
            <div className='flex flex-col items-center justify-center pt-20 bg-neutral-100 h-screen'>
                <div className='w-[400px] h-[496px] bg-white flex flex-col justify-center '>
                    <h2 className='w-10/12 mx-auto mb-2 font-bold text-base '>Welcome!</h2>
                    <h1 className='w-10/12 mx-auto mb-4 font-normal text-2xl'>Enter your details to create an account</h1>
                    <Formik
                        initialValues={{
                            email: '',
                            name: '',
                            password: '',
                        }}
                        onSubmit={handleSubmit}
                    >
                        {({ errors, touched }) => (
                            <Form className='flex flex-col items-center justify-center '>

                                <label className=' w-10/12 font-bold text-base mb-4' >
                                    <p className='font-bold text-base mb-2'>Name:</p>
                                    <Field type='text' name="name" validate={validateName} className="w-full h-10 bg-neutral-100 block" />
                                    {errors.name && touched.name && <div>{errors.name}</div>}
                                </label>

                                <label className=' w-10/12 font-bold text-base mb-4' >
                                    <p className='font-bold text-base mb-2'>Email:</p>
                                    <Field type='email' name="email" validate={validateEmail} className="w-full h-10 bg-neutral-100 block" />
                                    {errors.email && touched.email && <div>{errors.email}</div>}
                                </label>
                                <label className='inline-block w-10/12 font-bold text-base mb-8'>
                                    <div className='flex items-center justify-between'>

                                        <p className='font-bold text-base mb-2'>Password:</p>
                                    </div>
                                    <Field type='password' name="password" validate={validatePassword} className="w-full h-10 bg-neutral-100  block" />
                                    {errors.password && touched.password && <div>{errors.password}</div>}
                                </label>

                                <button type="submit" className='w-10/12 h-12 bg-[#4348da] text-white'>Submit</button>
                            </Form>
                        )}
                    </Formik>
                </div>
                <div className='flex flex-col justify-center items-center mt-4'>
                    <p className=' font-normal text-base text-neutral-400'>By creating an account you agree to our <a href='/register' className=' text-[#4348da] '>Terms</a> </p>
                    <p className=' font-normal text-base text-neutral-400'>already have an account? <a href='/login' className=' text-[#4348da] '>Log In</a> </p>
                </div>
            </div>
        </>
    )

    async function handleSubmit(values, formikBag) {
        const resp = await ky.post(`${process.env.REACT_APP_API_URL}/register`, {
            json: values,
            throwHttpErrors: false,
        })
            .json()

        if (resp.errors) {
            formikBag.setErrors(resp.errors)
            return
        }

        localStorage.setItem('access_token', resp.access_token)

        navigate('/')
    }
}