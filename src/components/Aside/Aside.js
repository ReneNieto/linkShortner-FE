import Logo from '../../assets/Logo.svg'
import LinkLogo from '../../assets/linkLogo.svg'
import { useContext } from 'react'
import context from '../../context/context'

export default function Aside() {

    const { isAuthUser } = useContext(context)
    return (
        <div className="w-1/5 h-screen bg-[#211b4e]  flex-col items-center hidden lg:flex ">
            <img src={Logo} className="w-11/12 h-1/8 mt-3 mb-4" />
            <h1 className='text-white font-semibold text-lg px-4 mb-4 text-center'>Welcome back <span className='block text-center'>{isAuthUser.name}</span></h1>
            <p className='w-10/12 font-bold text-xs text-neutral-500 uppercase mb-2'>Main</p>
            <div className='w-10/12 flex items-center bg-[#373588] cursor-pointer py-2 px-2'>
                <img src={LinkLogo} className="w-6 h-6" />
                <p className='w-10/12 font-normal text-sm text-neutral-100 ml-2'>Links</p>
            </div>


        </div>
    )
}