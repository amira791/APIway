const BASEURL = "http://127.0.0.1:8000/api_mapi/"
const ConsumerBASEURL = "http://127.0.0.1:8000/Consumer/"

const createHeaders = () => {
    const token = localStorage.getItem('token');
    if (token) {
        return {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        };
    }
    return {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
}

const fetchData = async (url, setter, setLoading, setError) => {

    setLoading(true);
    setError(null);

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: createHeaders()
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setter(data);
    } catch (error) {
        setError(error.message);
    } finally {
        setLoading(false);
    }
};

const postData = async (url, data, successMessage, toast, setError) => {

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: createHeaders(),
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        toast({
            title: successMessage.title,
            description: successMessage.description,
            status: 'success',
            duration: 5000,
            isClosable: true,
        });
    } catch (error) {
        setError(error);
        toast({
            title: 'Une erreur est survenue',
            description: error.message,
            status: 'error',
            duration: 5000,
        });
    }
};

export { BASEURL,ConsumerBASEURL,fetchData, postData };
