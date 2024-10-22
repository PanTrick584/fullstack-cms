import React, { useEffect, useState } from 'react'
import { handleData } from '../handlers/handlers'
import PageTypeForm from './PageTypeForm'


const PageTypes = ({ data, setType }) => {
    const [showForm, setShowForm] = useState(false)
    const [typesData, setTypesData] = useState([])
    const [loading, setLoading] = useState(true)
    const [clickedType, setClickedType] = useState()

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

    console.log(typesData);
    console.log(data._id);

    return (
        <div className='page-type'>

            {!loading ? typesData.length ? typesData.map((item, id) => <p onClick={() => setClickedType({ id, data: item })}>{item.title}</p>) : "There are no page types, click button to create..." : "Loading..."}
            {!showForm && <button onClick={() => setShowForm(true)}>add new type</button>}
            {showForm && <PageTypeForm pageData={data._id} setTypes={setTypesData} />}
        </div>
    )
}

export default PageTypes
