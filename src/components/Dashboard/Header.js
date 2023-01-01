import { useNavigate } from 'react-router-dom'
import SearchIcon from '../../assets/search.svg'
import LogoutIcon from '../../assets/logout.svg'
import MenuIcon from '../../assets/menu.svg'
import Logo from '../../assets/Logo.svg'
import Bell from '../../assets/bell.svg'
import Book from '../../assets/book.svg'






export default function Header() {
    const navigate = useNavigate()

    function logout() {
        localStorage.removeItem('access_token')
        navigate('/login')
    }

    return (
        <>
            <div className="flex h-16 items-center justify-between bg-[#211b4e] pr-4 pl-2 w-full lg:hidden ">


                <img src={Logo} className="w-1/4 h-full" />

                <button className=' p-1 mt-4  cursor-pointer  text-center rounded-full' onClick={logout}>
                    <img src={MenuIcon} className="w-6 h-6 rounded-full mb-4" />
                </button>

            </div>
            <div className="flex h-8 items-center justify-between lg:h-[8%] w-[calc(100%-32px)] ">
                <div className="flex relative items-center min-w-40 lg:w-1/5 h-8 lg:mt-4 bg-white rounded">
                    <input className="w-full h-full  pl-7 rounded text-neutral-100 border-none shadow" type="text" placeholder="Search..." />
                    <img src={SearchIcon} alt="logo" className="w-6 h-6  absolute pointer-events-none left-1" />
                </div>
                <div>

                    <button className=' p-1 mt-4 cursor-pointer  text-center rounded-full'>
                        <img src={Bell} className="w-6 h-6 rounded-full mb-4 mr-4 lg:mb-0 lg:mr-0 lg:hidden" />
                    </button>
                    <button className=' p-1 mt-4 cursor-pointer  text-center rounded-full' >
                        <img src={Book} className="w-6 h-6 rounded-full mb-4 mr-4 lg:mb-0 lg:mr-0 lg:hidden" />
                    </button>
                    <button className=' p-1 mt-4 cursor-pointer  text-center rounded-full' onClick={logout}>
                        <img src={LogoutIcon} className="w-6 h-6 rounded-full mb-4 lg:mb-0" />
                    </button>
                </div>

            </div>
        </>


    )
}