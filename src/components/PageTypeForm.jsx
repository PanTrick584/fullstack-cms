import { useEffect, useState } from "react";
import { handleData } from "../handlers/handlers";

const PageTypeForm = ({ pageId, pageDestination, setTypes, pagePath }) => {
    const [newType, setNewType] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        destination: String(pageDestination),
        parentPageId: String(pageId),
        path: pagePath
    });

    const [hideForm, setHideForm] = useState(false)

    useEffect(() => {
        if (!newType) return;
        setTypes(prev => [...prev, newType])
    }, [newType])

    const pageTypePath = "http://localhost:5000/page-type";

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

    // console.log(pageType);
    // console.log(pageData);
    // console.log(typeof pageData);

    return (
        <>
            {!hideForm &&
                <form onSubmit={(e) => {
                    console.log(formData);
                    if (!formData.title || !formData.parentPageId) return;
        
                    console.log(formData.title);
                    console.log(formData.id);
                    e.preventDefault();
                    fetchData(pageTypePath, setNewType, { method: "POST", body: JSON.stringify(formData) })
                    setHideForm(true)
                }}>
                    <label htmlFor="page-title">Insert Page Type Title</label>
                    <input
                        type="text"
                        name="page-title"
                        value={formData.title}
                        onChange={handleChangeTitle}
                        id="creator-page-title" />
                    <button type="submit">Create New Type</button>
                </form>
            }
        </>
    )
}

export default PageTypeForm;