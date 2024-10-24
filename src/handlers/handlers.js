export const handleData = async (path, setter, options = {}) => {
    const defaultHeaders = {
        accept: 'application/json',
        'User-Agent': 'learning app',
    };

    try {
        const response = await fetch(
            path,
            {
                headers: {
                    'Content-Type': 'application/json',
                    "Accept": "application/json",

                },
                ...options
            });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();

        if (setter) {
            console.log(result.data);
            setter(result.data);
        }

    } catch (error) {
        console.error("Error fetching data:", error);
        if (setter) {
            setter(null);
        }
    }
};

export const fetchData = async (path, setter, body = {}) => {
    try {
        await handleData(path, setter, body);
    } catch (error) {
        console.log(error);
    }
};