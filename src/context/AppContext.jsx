import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [userData, setUserData] = useState("siema");
    const [loadings, setLoadings] = useState({
        adminPageLIst: true
    })

    return (
        <AppContext.Provider
            value={{
                userData,
                setUserData,
                loadings,
                setLoadings
            }}>
            {children}
        </AppContext.Provider>
    );
};
