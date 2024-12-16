import { useState, useCallback } from "react";
import axios from "axios";

const useAxios = (baseUrl) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const request = useCallback(async ({ method, url = "", body = null, headers = {} }) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios({
                method,
                url: `${baseUrl}${url}`,
                data: body,
                headers,
            });
            setData(response.data);
            return response.data;
        } catch (err) {
            setError(err.message || "Something went wrong");
            console.error(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [baseUrl]);

    const post = (url, body, headers = {}) =>
        request({ method: "POST", url, body, headers });

    const get = (url = "", headers = {}) =>
        request({ method: "GET", url, headers });

    const patch = (url, body, headers = {}) =>
        request({ method: "PATCH", url, body, headers });

    const remove = (url, headers = {}) =>
        request({ method: "DELETE", url, headers });

    return { data, loading, error, post, get, patch, remove };
};

export default useAxios;