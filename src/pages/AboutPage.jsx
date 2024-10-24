import { useEffect, useState } from "react";
import { handleData } from "../handlers/handlers";

const AboutPage = () => {

    // const devDataPath = "http://localhost:5000" + builDatadPath;
    // const { userData } = useContext(AppContext);
    const pageStructurePath = `http://localhost:5000/page-structure?side=about`;
    const [page, setPage] = useState(null)

    useEffect(() => {
        fetchData(pageStructurePath, setPage);
    }, []);

    const fetchData = async (path, setter) => {
        try {
            await handleData(path, setter);
        } catch (error) {
            console.log(error);
        } finally {
            // setLoading(false)
        }
    };

    return(
        <div className="">{page?.map((item, id) =>{
            return(
                <div className="" key={id}>
                    <h3>
                        {item.structure}
                    </h3>
                </div>
            )
        } )}</div>
    )
}

export default AboutPage