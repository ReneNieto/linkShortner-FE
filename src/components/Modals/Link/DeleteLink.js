import ky from "ky";
import { useContext } from "react";
import context from "../../../context/context";
export default function DeleteLink({ setIsDeleteLinkModal }) {
    const { isTargetLink } = useContext(context)
    const { isLinks, setIsLinks } = useContext(context)
    console.log(isLinks)
    async function handleSubmit() {
        const accessToken = localStorage.getItem('access_token');
        console.log(isTargetLink.id);

        const resp = await ky.delete(`${process.env.REACT_APP_API_URL}/link/${isTargetLink.id}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        }).json()
        setIsLinks((isLinks) => isLinks.filter((link) => link.id !== isTargetLink.id))
        setIsDeleteLinkModal(false)
    }


    return (
        <div className="w-screen h-screen fixed right-0 left-0 top-0 bottom-0 flex items-center justify-center z-50 bg-black bg-opacity-80">
            <div className='bg-white w-[400px] h-[280px] flex flex-col items-center justify-center relative rounded-2xl'>
                <h1 className='w-[300px] mx-auto mb-10 font-normal text-2xl text-center whitespace-pre-wrap text-ellipsis overflow-hidden'>Are you sure you want to delete {isTargetLink.link}?</h1>


                <div className="flex item-center justify-between w-around gap-10">
                    <button className="bg-white font-bold w-20 h-12 py-2 px-4 rounded  flex items-center justify-center mx-2 my-2 border border-blue-500 hover:bg-blue-500 hover:text-white"
                        onClick={() => {
                            setIsDeleteLinkModal(false)
                        }}>
                        Cancel
                    </button>
                    <button className="bg-white font-bold w-20 h-12 py-2 px-4 rounded flex items-center justify-center mx-2 my-2 border border-red-500 hover:bg-red-500 hover:text-white"
                        onClick={handleSubmit}>
                        Yes
                    </button>
                </div>

            </div>

        </div>
    )

}