const settings = {
    host: '',
}

async function request(url, options) {
    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.message);
        }
        try {
            const data = await response.json();
            return data;
        } catch (err) {
            return response;
        }

    } catch (err) {
        alert(err);
        throw err;
    }
}

function setOptions(method = 'GET', body) {
    const options = {
        method,
        headers: {}
    };

    const token = sessionStorage.getItem('authToken');
    if (token != null) {
        options.headers['X-Authorization'] = token;
    }
    if (body) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(body);
    }

    return options;
}

async function getData(url) {
    return await request(url, setOptions('GET'));
}

async function postData(url, data) {
    return await request(url, setOptions('POST', data));
}

async function updateData(url, data) {
    return await request(url, setOptions('PUT', data));
}

async function deleteData(url) {
    return await request(url, setOptions('DELETE'));
}

async function login(email, password) {
    const result = await postData(settings.host + '/users/login', { email, password });
    
    sessionStorage.setItem('email', result.email);
    sessionStorage.setItem('authToken', result.accessToken);
    sessionStorage.setItem('userId', result._id);
}

async function register(email, password) {
    const result =  await postData(settings.host + '/users/register', { email, password });
    sessionStorage.setItem('email', result.email);
    sessionStorage.setItem('authToken', result.accessToken);
    sessionStorage.setItem('userId', result._id);
}

async function logout() {
    const result =  await getData(settings.host + '/users/logout');
    sessionStorage.removeItem('email', result.email);
    sessionStorage.removeItem('authToken', result.accessToken);
    sessionStorage.removeItem('userId', result._id);
}

export const api = {
    getData,
    postData,
    updateData,
    deleteData,
    login,
    register,
    logout,
    settings
}