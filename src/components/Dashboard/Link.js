import { useContext, useState } from 'react'
import { formatDistance, subDays } from 'date-fns'
import context from '../../context/context'
import DeleteIcon from '../../assets/delete.svg'
import DeleteLink from '../Modals/Link/DeleteLink'
import EditIcon from '../../assets/edit.svg'



export default function Link({ link }) {
    const [isDeleteLinkModal, setIsDeleteLinkModal] = useState(false)
    const { setIsTargetLink } = useContext(context)


    function handleDelete() {
        setIsDeleteLinkModal(true)
        setIsTargetLink(link);
    }
    function handleEdit() {
        setIsTargetLink(link);
    }
    return (
        <div className="w-full h-14  bg-white px-4 flex items-center justify-between border-b">
            <div className="flex flex-col w-1/2">
                <a href={link.shortlink} target='_blank' className='font-normal text-base whitespace-nowrap text-ellipsis overflow-hidden'>{link.shortlink}</a>
                <p className='font-normal text-xs text-neutral-400 whitespace-nowrap text-ellipsis overflow-hidden'>{link.link}</p>
            </div>
            <div className='flex items-center justify-end gap-5'>
                <p className='font-normal text-sm text-neutral-400'>{formatDistance(subDays(new Date(link.created_at), 0), new Date(), { addSuffix: true })
                }</p>
                <p className='font-normal text-sm text-neutral-400'>{link.views} views</p>
                <button
                    onClick={handleEdit}
                >
                    <img src={EditIcon} className='w-6 h-6' ></img>

                </button>
                <button
                    onClick={handleDelete}
                >
                    <img src={DeleteIcon}></img>

                </button>
            </div>

            {isDeleteLinkModal && <DeleteLink setIsDeleteLinkModal={setIsDeleteLinkModal} />}
        </div >


    )
}