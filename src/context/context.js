import { createContext } from "react";

const context = createContext({
    isAddLinkModal: false,
    isAuthUser: null,
    isTargetLink: {},
    isLinks: [],

});


export default context;