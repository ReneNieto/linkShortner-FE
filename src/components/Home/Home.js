import { useEffect, useState, useContext } from "react";
import ky from "ky";
import { useNavigate } from 'react-router-dom'
import context from '../../context/context'
import Aside from "../Aside/Aside"
import Dashboard from "../Dashboard/Dashboard.js";

export default function Home() {
    const navigate = useNavigate()
    const { isAuthUser, setIsAuthUser } = useContext(context)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const accessToken = localStorage.getItem('access_token');

        ky.get(`${process.env.REACT_APP_API_URL}/user`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
            .json()
            .then((resp) => {
                setIsAuthUser(resp)
            })
            .catch((err) => {
                localStorage.removeItem('access_token')
                navigate('/login')
            })
            .finally(() => {
                setLoading(false)
            })
    }, [navigate])

    if (loading) {
        return <div>Loading app..</div>
    }

    if (!isAuthUser) {
        return null
    }

    return (
        <div className="flex w-full">
            <Aside />
            <Dashboard />

        </div>
    )
}
