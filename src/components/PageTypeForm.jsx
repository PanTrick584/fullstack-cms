import { useEffect, useState } from "react";
import { handleData } from "../handlers/handlers";

const PageTypeForm = ({ pageData }) => {
    const [newType, setNewType] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        id: pageData,
    });

    console.log(pageData);

    const buildAdminPath = "/admin/page-type/"
    const pageTypePath = "http://localhost:5000" + buildAdminPath

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

    console.log(newType);

    return (
        <form onSubmit={(e) => {
            if (!formData.title || !formData.id) return;

            e.preventDefault();
            fetchData(pageTypePath, setNewType, { method: "POST", body: JSON.stringify(formData) })
        }}>
            <label htmlFor="page-title">Insert Page Type Title</label>
            <input
                type="text"
                name="page-title"
                value={formData.title}
                onChange={handleChangeTitle}
                id="creator-page-title" />
            <button type="submit">Create New Page</button>
        </form>
    )
}

export default PageTypeForm;