import React, { useEffect, useState } from 'react'
import { handleData } from '../handlers/handlers'
import PageTypeForm from './PageTypeForm'


const PageTypes = ({ data, setType, setTypeStructures }) => {
    const [showForm, setShowForm] = useState(false)
    const [typesData, setTypesData] = useState([])
    const [loading, setLoading] = useState(true)
    const [clickedType, setClickedType] = useState();

    const pageTypePath = `http://localhost:5000/page-type?type=${data._id}`;


    useEffect(() => {
        fetchData(pageTypePath, setTypesData)
        setLoading(false)
    }, [])

    useEffect(() => {
        setType(clickedType)
    }, [clickedType])

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
        const pageStructurePath = `http://localhost:5000/page-structure?type=${item._id}`;
        setClickedType({ id, data: item })
        fetchData(pageStructurePath, setTypeStructures)
    }

    // console.log(typeStructures);
    // console.log(data._id);

    return (
        <div className='page-type'>

            {!loading ? typesData.length ? typesData.map((item, id) => {
                return (<div className="">
                    <p>Page type: {item.title}</p>
                    <button onClick={() => handlePageTypeData(item, id)}>create page type structure +</button>
                </div>)
            }) : "There are no page types, click button to create..." : "Loading..."}
            {!showForm && <button onClick={() => setShowForm(true)}>add new type</button>}
            {showForm && <PageTypeForm pageData={data._id} setTypes={setTypesData} />}
        </div>
    )
}

export default PageTypes
