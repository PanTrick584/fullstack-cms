import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { handleData } from '../handlers/handlers';
import "./styles/home-page.scss"
import { AppContext } from '../context/AppContext';

const HomePage = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true)
    const builDatadPath = "/api/v1/data"
    const devDataPath = "http://localhost:5000" + builDatadPath;
    const { userData } = useContext(AppContext);
    const pageStructurePath = `http://localhost:5000/page-structure?main=true`;
    const [mainPage, setMainPage] = useState(null)

    useEffect(() => {
        fetchData(pageStructurePath, setMainPage);
    }, []);

    const fetchData = async (path, setter) => {
        try {
            await handleData(path, setter);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    };

    console.log(mainPage);

    if (loading) return <div>Loading...</div>

    return (
        <>
            <nav className='nav'>
                <Link to="/admin" className='nav-link'>
                    <button className='nav-btn'>Go to Secret Admin Page</button>
                </Link>
            </nav>
            <div>
                <h1>{mainPage?.map((item, id) => {
                    return (
                        <div className="">
                            {item.structure.map((structure) => {
                                return (
                                    <div className="">
                                        {structure}
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}</h1>
            </div>

        </>
    )
}

export default HomePage
