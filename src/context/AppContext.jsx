import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [pagesList, setPagesList] = useState([]);
    const [pageType, setPageType] = useState(null)
    const [typeStructures, setTypeStructures] = useState([])
    const [newActive, setNewActive] = useState(null);
    const [pageRevisions, setPageRevisions] = useState([]);
    const [showStructure, setShowStructure] = useState(false);

    // useEffect(() => {
    //     setShowPageTypes(() => pagesList.map((_, id) => ({ id, status: false })))
    // }, [pagesList])
    // console.log(typeStructures);
    // console.log(pageStructure);

    const [loadings, setLoadings] = useState({
        adminPageLIst: true
    })

    return (
        <AppContext.Provider
            value={{
                loadings,
                setLoadings,
                pagesList,
                setPagesList,
                pageType,
                setPageType,
                typeStructures,
                setTypeStructures,
                newActive,
                setNewActive,
                pageRevisions,
                setPageRevisions,
                showStructure,
                setShowStructure
            }}>
            {children}
        </AppContext.Provider>
    );
};
