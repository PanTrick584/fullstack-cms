import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { handleData } from '../handlers/handlers';
import "./styles/home-page.scss"

const HomePage = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true)
    const builDatadPath = "/api/v1/data"
    const devDataPath = "http://localhost:5000" + builDatadPath

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            await handleData(devDataPath, setData);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    };

    if (loading) return <div>Loading...</div>

    return (
        <>
            <nav className='nav'>
                <Link to="/admin" className='nav-link'>
                    <button className='nav-btn'>Go to Secret Admin Page</button>
                </Link>
            </nav>
            <div>
                <h1>{data.map((item, id) => <p key={`home-page-header-${id}`}>{item.section}</p>)}</h1>
            </div>

        </>
    )
}

export default HomePage
