import Header from './Header'
import Graph from './Graph'
import Links from './Links'
import Edit from './Edit'

export default function Dashboard() {
    return (
        <div className=" w-full lg:h-screen flex flex-col items-center bg-neutral-200 gap-4 lg:w-4/5 ">
            <Header />
            <Graph />
            <div className='flex flex-wrap w-[calc(100%-32px)] h-[500px] gap-y-4  lg:flex-nowrap lg:gap-4 lg:h-[46%]'>
                <Links />
                <Edit />
            </div>

        </div>
    )
}