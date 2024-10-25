import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [pagesList, setPagesList] = useState([]);
    const [typesList, setTypesList] = useState([]);
    const [pageType, setPageType] = useState(null)
    const [typeStructures, setTypeStructures] = useState([])
    const [newActive, setNewActive] = useState(null);
    const [pageRevisions, setPageRevisions] = useState([]);
    const [showStructure, setShowStructure] = useState([]);

    useEffect(() => {
        setShowStructure(() => pageRevisions.map((_, id) => ({ id, status: false })))
    }, [])

    // console.log(pageRevisions);
    // console.log(showStructure);

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
                typesList,
                setTypesList,
                pageType,
                setPageType,
                typeStructures,
                setTypeStructures,
                newActive,
                setNewActive,
                pageRevisions,
                setPageRevisions
            }}>
            {children}
        </AppContext.Provider>
    );
};
