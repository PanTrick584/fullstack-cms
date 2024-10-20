import { useEffect, useState } from "react";
// import fetchData

const AddPageForm = () => {
    const [newPage, setNewPage] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        type: "",
    });
    const buildAdminPath = "/admin"
    const devAdminPath = "http://localhost:5000" + buildAdminPath

    useEffect(() => {
        if (newPage === null) return;
        console.log(newPage);
        setPagesList(prev => [...prev, newPage])
        // console.log(pagesList);
    }, [newPage])

    const fetchData = async (path, setter, body = {}) => {
        try {
            await handleData(path, setter, body);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    };

    const handleChangeTitle = (e) => {
        const { value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            title: value
        }))
    }

    const handleChangeType = (e) => {
        const { value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            type: value
        }))
    }

    return(
        <form onSubmit={(e) => {
            if (!formData.title || !formData.type) return;

            e.preventDefault();
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
                onClick={handleChangeType} />
            <label htmlFor="page-type-side">Side Page</label>
            <input
                type="checkbox"
                name='page-type-side'
                value={"side"}
                onClick={handleChangeType} />
            <button type="submit">Create New Page</button>
        </form>
    )
}

export default AddPageForm;