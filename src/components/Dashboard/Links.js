import { useEffect, useContext, useState } from 'react'
import ky from 'ky'
import NewLink from '../Modals/Link/NewLink'
import Link from './Link'
import context from '../../context/context'

export default function Links() {
    const { isAddLinkModal, setIsAddLinkModal, isLinks, setIsLinks } = useContext(context)


    useEffect(() => {
        (async function fetchData() {
            const accessToken = localStorage.getItem('access_token')
            const resp = await ky.get(`${process.env.REACT_APP_API_URL}/links`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                }
            }).json()
            setIsLinks(resp.data)
        }
        )()

    }, [])

    return (
        <div className="w-full h-[50%] overflow-hidden bg-white lg:w-2/3 lg:h-full shadow rounded-lg ">
            <div className="w-full h-14 flex justify-between items-center bg-[#f6f6f9] px-4 rounded-t-lg ">
                <p>Links</p>
                <button className="bg-[#ececee] font-bold py-2 px-4 rounded h-8 w-8 flex items-center justify-center "
                    onClick={() => {
                        setIsAddLinkModal(true)
                    }}>
                    +
                </button>
            </div>
            <div className="w-full h-[170px] overflow-hidden overflow-y-auto  lg:overflow-y-auto">
                {isLinks.map((item, index) => {
                    return <Link key={index} link={item} />
                })}

                {isAddLinkModal && <NewLink />}
            </div>
        </div>






    )
}