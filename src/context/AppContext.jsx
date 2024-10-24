import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [userData, setUserData] = useState("siema");
    const [pagesList, setPagesList] = useState([]);
    const [pageType, setPageType] = useState(null)


    const [loadings, setLoadings] = useState({
        adminPageLIst: true
    })

    return (
        <AppContext.Provider
            value={{
                userData,
                setUserData,
                loadings,
                setLoadings,
                pagesList,
                setPagesList,
                pageType,
                setPageType
            }}>
            {children}
        </AppContext.Provider>
    );
};
