import React, { useContext, useEffect, useState } from 'react'
import { handleData } from '../handlers/handlers'
import PageTypeForm from './PageTypeForm'
import { AppContext, AppProvider } from '../context/AppContext';


const PageTypes = ({ data, setType, setTypeStructures }) => {
    const [showForm, setShowForm] = useState(false)
    const [typesData, setTypesData] = useState([])
    const [loading, setLoading] = useState(true)
    const [clickedType, setClickedType] = useState();

    const pageTypePath = `http://localhost:5000/page-type?pageId=${data._id}`;
    const { pageType, setPageType } = useContext(AppContext);


    useEffect(() => {
        fetchData(pageTypePath, setTypesData)
        setLoading(false)
    }, [])

    useEffect(() => {
        setType(clickedType)
    }, [clickedType])

    useEffect(() => {
        setShowForm(false)
    }, [typesData])
    // const pageTypePath = devAdminPath + '?type=pageType'
    // console.log(data);

    // const handleNewPageType = () => {
    //     console.log("new page type");
    // }

    const fetchData = async (path, setter, body = {}) => {
        try {
            await handleData(path, setter, body);
        } catch (error) {
            console.log(error);
        } finally {
            setShowForm(false)
        }
    };

    const handlePageTypeData = (item, id) => {
        const pageStructurePath = `http://localhost:5000/page-structure?parentTypeId=${item._id}`;
        setClickedType({ id, data: item })
        fetchData(pageStructurePath, setTypeStructures)
    }

    // console.log(typeStructures);
    // console.log(data._id);

    return (
        <div className='page-type'>

            {!loading ? typesData.length ? typesData.map((item, id) => {
                return (<div className="" key={`page-type${id}`}>
                    <p>Page type: {item.title}</p>
                    <button onClick={() => handlePageTypeData(item, id)}>create structure or modify</button>
                </div>)
            }) : "There are no page types, click button to create..." : "Loading..."}
            {!showForm && <button onClick={() => setShowForm(true)}>add new type</button>}
            {showForm && <PageTypeForm pageId={data._id} pageDestination={data.destination} pagePath={data.path} setTypes={setTypesData} />}
        </div>
    )
}

export default PageTypes;