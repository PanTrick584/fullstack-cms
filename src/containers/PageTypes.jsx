import React, { useContext, useEffect, useState } from 'react'
import { fetchData } from '../handlers/handlers'
import PageTypeForm from '../components/PageTypeForm'
import { AppContext } from '../context/AppContext';

const PageTypes = ({ data }) => {
    const [showForm, setShowForm] = useState(false)
    const [typesData, setTypesData] = useState([])
    const [loading, setLoading] = useState(true)
    const [clickedType, setClickedType] = useState();

    const pageTypePath = `http://localhost:5000/page-type?pageId=${data._id}`;

    const {
        setPageType,
        setPageRevisions,
        typesList,
        setTypesList,
    } = useContext(AppContext);


    useEffect(() => {
        fetchData(pageTypePath, setTypesList)
        setLoading(false)
    }, [])

    useEffect(() => {
        setPageType(clickedType)
    }, [clickedType])

    useEffect(() => {
        setShowForm(false)
    }, [typesList])

    const handlePageTypeData = (item, id) => {
        const pageStructurePath = `http://localhost:5000/page-structure?parentTypeId=${item._id}`;
        setClickedType({ id, data: item })
        fetchData(pageStructurePath, setPageRevisions)
    }

    return (
        <div className='page-type'>
            {
                !loading ?
                    typesList.length ?
                        typesList.map((item, id) => {
                            return (
                                <div
                                    className=""
                                    key={`page-type${id}`}>
                                    <p>Page type: {item.title}</p>
                                    <button
                                        onClick={() => handlePageTypeData(item, id)}>
                                        create structure or modify
                                    </button>
                                </div>
                            )
                        }) : "There are no page types, click button to create..." : "Loading..."
            }
            {
                !showForm &&
                <button onClick={() => setShowForm(true)}>
                    add new type
                </button>}
            {
                showForm &&
                <PageTypeForm
                    pageId={data._id}
                    pageDestination={data.destination}
                    pagePath={data.path}
                    setTypes={setTypesList} />
            }
        </div>
    )
}

export default PageTypes;