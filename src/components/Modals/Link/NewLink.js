import React, { useContext } from 'react';
import ky from 'ky';
import context from '../../../context/context';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';





export default function NewLink() {

    const regex = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/g
    const UrlSchema = Yup.object().shape({

        link: Yup.string().matches(regex, 'URL is not valid').required('URL is required'),
    });

    const { setIsAddLinkModal } = useContext(context)
    const { isAuthUser } = useContext(context)

    return (
        <div className="w-screen h-screen fixed right-0 left-0 top-0 bottom-0 flex items-center justify-center z-50 bg-black bg-opacity-80">
            <div className='bg-white w-[400px] h-[280px] flex flex-col items-center justify-center relative rounded-2xl'>
                <h1 className='w-[300px] mx-auto mb-10 font-normal text-2xl '>Add a new link</h1>
                <button className="bg-white font-bold absolute top-0 right-0 py-2 px-4 rounded h-8 w-8 flex items-center justify-center mx-2 my-2"
                    onClick={() => {
                        setIsAddLinkModal(false)
                    }}>
                    X
                </button>
                <Formik
                    initialValues={{
                        link: '',
                        user_id: isAuthUser.id
                    }}
                    validationSchema={UrlSchema}
                    onSubmit={handleSubmit}
                >
                    {({ errors, touched }) => (
                        <Form className='w-10/12'>
                            <Field name="link" autoComplete="off" className="w-full h-11 bg-neutral-100 rounded mb-4 px-4  block" />
                            {errors.link && touched.link ? (
                                <div className='text-red-500 font-semibold text-sm'>{errors.link}</div>
                            ) : null}

                            <button type="submit" className='w-full h-12 rounded bg-[#4348da] text-white'>Submit</button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>

    )

    async function handleSubmit(values) {
        const accessToken = localStorage.getItem('access_token');

        const resp = await ky.post(`${process.env.REACT_APP_API_URL}/link`, {
            json: values,
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
            throwHttpErrors: false,
        })
            .json()

        setIsAddLinkModal(false)

        window.location.reload()


    }


}