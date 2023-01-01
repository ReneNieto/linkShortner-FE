import { useNavigate } from 'react-router-dom'
import { Formik, Form, Field } from 'formik';
import { buildFormikErrors } from '../../utils/build-formik-errors.js'

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

    <div className='flex flex-col items-center justify-center pt-20 bg-neutral-100 h-screen'>
      <div className='w-[400px] h-[400px] bg-white flex flex-col justify-center '>
        <h2 className='w-10/12 mx-auto mb-2 font-bold text-base '>Welcome back.</h2>
        <h1 className='w-10/12 mx-auto mb-4 font-normal text-2xl'>Enter your details below</h1>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className='flex flex-col items-center justify-center '>
              <label className=' w-10/12 font-bold text-base mb-4' >
                <p className='font-bold text-base mb-2'>Email:</p>
                <Field type='email' name="email" validate={validateEmail} className="w-full h-10 bg-neutral-100 block" />
                {errors.email && touched.email && <div className='text-red-500'>{errors.email}</div>}
              </label>
              <label className='inline-block w-10/12 font-bold text-base mb-4'>
                <div className='flex items-center justify-between'>

                  <p className='font-bold text-base mb-2'>Password:</p>
                  <a className='text-sm font-light text-neutral-600 block' href='#'>Forgot your password?</a>
                </div>
                <Field type='password' name="password" validate={validatePassword} className="w-full h-10 bg-neutral-100  block" />
                {errors.password && touched.password && <div className='text-red-500'>{errors.password}</div>}
              </label>
              <label className='inline-block w-10/12 font-bold text-base mb-4'>
                <div className='flex items-center'>
                  <input type='checkbox' className='w-6 h-6 bg-neutral-100 block mr-2' />
                  <p className='font-bold text-base'>Remember me</p>
                </div>
              </label>
              <button type="submit" className='w-10/12 h-12 bg-[#4348da] text-white'>Submit</button>
            </Form>
          )}
        </Formik>
      </div>
      <div className='mt-4'>
        <p className=' font-normal text-base text-neutral-400 inline'>Don't have an account? </p><a href='/register' className=' text-[#4348da] '>Sign Up</a>
      </div>
    </div>

  )
  async function handleSubmit(values, formikBag) {
    const resp = await ky
      .post(`${process.env.REACT_APP_API_URL}/login`, {
        json: values,
        throwHttpErrors: false,
      })
      .json()

    if (resp.errors) {
      const errors = buildFormikErrors(resp.errors)

      formikBag.setErrors(errors)

      return
    }

    localStorage.setItem('access_token', resp.access_token)

    navigate('/')
  }
}