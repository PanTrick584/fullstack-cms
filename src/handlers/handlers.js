export const handleData = async (path, setter, options = {}) => {
    const defaultHeaders = {
        accept: 'application/json',
        'User-Agent': 'learning app',
    };

    // console.log(body);
    // console.log(...options);


    try {
        // Perform the fetch request
        const response = await fetch(
            path,
            {
                headers: {
                    'Content-Type': 'application/json',
                    "Accept": "application/json",

                },
                ...options
            });

        // Check if the response is successful (status code 200-299)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();

        // Use the setter function to set the data
        if (setter) {
            console.log(result.data);
            setter(result.data); // Assuming the API response has a `data` field
        }

    } catch (error) {
        console.error("Error fetching data:", error);
        if (setter) {
            setter(null); // Set to null or default value on error
        }
    }
};

// export const handleData = async (path, setter) => {
//     console.log(path);
//     let fetchedData;
//     try {
//         await fetch(
//             path,
//             {
//                 headers: {
//                     accept: 'application/json',
//                     'User-agent': 'learning app',
//                 }
//             }
//         ).then(response => response.json()).then(data => fetchedData = data.data)


//     } catch (error) {
//         console.error("Error fetching data:", error)
//     } finally {
//         // setLoading(false)
//         return fetchedData;
//     }
// }
