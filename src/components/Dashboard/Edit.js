import { useContext, useState, useEffect } from "react"
import context from '../../context/context'
import ky from 'ky';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

export default function Edit() {
    const { isTargetLink, isLinks, setIsLinks } = useContext(context)
    const [isRender, setIsRender] = useState(false)


    useEffect(() => {
        if (isTargetLink.id) {
            setIsRender(true)
        }
    }, [isTargetLink])

    const regex = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/g
    const UrlSchema = Yup.object().shape({

        link: Yup.string().matches(regex, 'URL is not valid').required('URL is required'),
    });

    async function handleSubmit(values) {
        const accessToken = localStorage.getItem('access_token');

        const resp = await ky.patch(`${process.env.REACT_APP_API_URL}/link/${isTargetLink.id}`, {
            json: values,
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        })
            .json()
        setIsRender(false)
        setIsLinks((isLinks) => {
            return isLinks.map(link => {
                if (link.id === isTargetLink.id) {
                    return { ...link, ...values }
                }
                return link
            })
        })


    }
    return (
        <div className="w-full h-[47%] lg:w-1/3 lg:h-full bg-white shadow rounded-t-lg">
            <div className="w-full h-14 flex justify-between items-center bg-[#f6f6f9] px-4 rounded-t-lg">
                <p>Edit Link</p>
            </div>
            {isRender &&
                <div className="w-full h-[50%] flex flex-col items-center justify-center mt-8 ">
                    <Formik
                        initialValues={{
                            link: isTargetLink.link,
                        }}
                        enableReinitialize
                        validationSchema={UrlSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ errors, touched }) => (
                            <Form className="flex gap-x-4 justify-center  w-11/12 lg:block">
                                <Field name="link" autoComplete="off" className=" w-1/2 lg:w-full  h-12 bg-neutral-100 rounded mb-4 px-4  block" />
                                {errors.link && touched.link ? (
                                    <div>{errors.link}</div>
                                ) : null}

                                <button type="submit" className='w-1/4 lg:w-full h-12 rounded bg-[#4348da] text-white'>Save</button>
                            </Form>
                        )}
                    </Formik>
                </div>


            }

        </div>
    )
}