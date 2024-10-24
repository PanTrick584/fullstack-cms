import { useContext, useEffect, useState } from "react";
import PageTypes from "./PageTypes";
import { AppContext, AppProvider } from '../context/AppContext';
import { fetchData } from "../handlers/handlers";

const Pages = () => {
    const [pageType, setPageType] = useState(null)
    const [typeStructures, setTypeStructures] = useState([])
    const [showPageTypes, setShowPageTypes] = useState([]);
    const [loading, setLoading] = useState({
        pageList: true,
    });

    const { pagesList, setPagesList } = useContext(AppContext);

    const buildAdminPath = "/admin"
    const devAdminPath = "http://localhost:5000" + buildAdminPath

    useEffect(() => {
        fetchData(devAdminPath, setPagesList)
        setLoading(prev => ({ ...prev, pageList: false }))
    }, [])

    useEffect(() => {
        setShowPageTypes(() => pagesList.map((_, id) => ({ id, status: false })))
    }, [pagesList])

    const handleShowTypes = (prev, id) => {
        const updatePage = prev.map((item, itemId) => {
            if (itemId === id) return ({ id, status: true });
            return item;
        });
        return updatePage;
    }

    return(
        <div className="admin-page-pages">
            {
                !loading.pageList ?
                    pagesList.map((item, id) => {
                        const {title, destination} = item;
                        return (
                            <div key={`admin-pages-${id}`}>
                                <h2 className='page-type-title'>Page title: {title}</h2>
                                <div className="page-type-usage">Page destination: {destination}</div>
                                {
                                    !showPageTypes[id]?.status &&
                                        <button 
                                            onClick={() => setShowPageTypes((prev) => handleShowTypes(prev, id))}>
                                                show page types
                                        </button>
                                }
                                {
                                    showPageTypes[id]?.status &&
                                        <PageTypes
                                            data={item}
                                            setType={setPageType}
                                            setTypeStructures={setTypeStructures} />
                                }
                            </div>

                        )
                    }) :
                "Loading..."
            }
        </div>
    )
}

export default Pages;