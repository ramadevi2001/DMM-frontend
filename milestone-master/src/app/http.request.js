import axios from 'axios';
export const handleFetch = async (url, options = {}) => {
    console.log('Fetching choies...');
    const completeUrl = `http://127.0.0.1:8000${url}`;
    try {
        const response = await axios({
            url: completeUrl,
            method: options.method || 'GET',
            headers: options.headers || {},
        });
        console.log("getChoicesg response: " + response.data)
        return response.data;
    } catch (error) {
        // Extract the error message from the response if available
        const errors = error.response.data;
        const keys = Object.values(errors);
        let finalErrors = keys.flat();
        const errorMessage = finalErrors.join("\n");
        throw new Error(errorMessage);
    }
};


