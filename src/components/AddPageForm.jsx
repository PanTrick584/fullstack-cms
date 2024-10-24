import { useEffect, useState } from "react";
import { handleData } from "../handlers/handlers";
// import fetchData

const AddPageForm = ({ setPages, addPage }) => {
    const [newPage, setNewPage] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        destination: "",
        path: "",
        component: ""
    });
    const buildAdminPath = "/admin"
    const devAdminPath = "http://localhost:5000" + buildAdminPath

    useEffect(() => {
        if (newPage === null) return;
        console.log(newPage);
        setPages(prev => [...prev, newPage])
        addPage(false)
    }, [newPage])

    const fetchData = async (path, setter, body = {}) => {
        try {
            await handleData(path, setter, body);
        } catch (error) {
            console.log(error);
        } finally {
            // setLoading(false)
        }
    };

    const handleChangeTitle = (e) => {
        const { value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            title: value
        }))
    }

    const handleChangePath = (e) => {
        const { value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            path: value
        }))
    }

    const handleChangeComponent = (e) => {
        const { value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            component: value
        }))
    }

    const handleChangeDestination = (e) => {
        const { value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            destination: value
        }))
    }

    // console.log(newPage);
    // console.log(formData);
    return (
        <form onSubmit={(e) => {
            if (!formData.title || !formData.destination) return;

            e.preventDefault();

            console.log(formData);
            fetchData(devAdminPath, setNewPage, { method: "POST", body: JSON.stringify(formData) })
            // setLoading(true)
        }}>
            <label htmlFor="page-title"></label>
            <input
                type="text"
                name="page-title"
                value={formData.title}
                onChange={handleChangeTitle}
                id="creator-page-title" />
            <label htmlFor="page-type-main">Main Page</label>
            <input
                type="checkbox"
                name='page-type-main'
                value={"main"}
                onClick={handleChangeDestination} />
            <label htmlFor="page-type-side">Side Page</label>
            <input
                type="checkbox"
                name='page-type-side'
                value={"side"}
                onClick={handleChangeDestination} />
            {formData.destination === 'side' &&
            <>
            <label htmlFor="page-path">Create Path</label>
                <input
                    type="text"
                    name='page-path'
                    value={formData.path}
                    onChange={handleChangePath} />
            </>
                
            }
            <label htmlFor="page-component">Specify component</label>
            <input
                type="text"
                name='page-component'
                value={formData.component}
                onClick={handleChangeComponent} />
            <button type="submit">Create New Page</button>
        </form>
    )
}

export default AddPageForm;