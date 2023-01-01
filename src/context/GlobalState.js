import { Children, useState } from 'react';
import context from './context';

export default function GlobalState({ children }) {
    const [isAuthUser, setIsAuthUser] = useState(null);
    const [isAddLinkModal, setIsAddLinkModal] = useState(false);
    const [isTargetLink, setIsTargetLink] = useState({});
    const [isLinks, setIsLinks] = useState([]);


    return (
        <context.Provider value={{
            setIsAuthUser,
            isAuthUser,
            isAddLinkModal,
            setIsAddLinkModal,
            isTargetLink,
            setIsTargetLink,
            setIsLinks,
            isLinks,
        }}>
            {children}
        </context.Provider>
    )
}