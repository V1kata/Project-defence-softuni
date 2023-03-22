const host = 'http://localhost:5000';

export const request = async (method, url, data) => {
    const options = {
        method,
        headers: {}
    }

    if (data) {
        options.headers['Content-type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(host + url, options);

        if (response.status === 204) {
            return response;
        }

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || data.error);
        }

        return data;
    } catch (err) {
        alert(err.message);
        throw err;
    }
}

