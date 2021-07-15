const host = 'http://localhost:3030/jsonstore/collections/books/';

async function request (url, options){
    const response = await fetch(url, options);
    if (response.ok) {
        return await response.json();
    } else {
        const err = await response.json();
        alert(err.message);
    }
}

export async function getAllData() {
    return Object
    .entries(await request(host))
    .map(([k, v]) => {v._id = k; return v});
}

export async function getDataById(id) {
    return await request(host + id);
}

export async function postData(text){
    return await request(host, {
        method: 'post',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(text)
    });
}


export async function updateData(text, id){
    return await request(host + id, {
        method: 'put',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(text)
    });
}

export async function deleteData(id){
    return await request(host + id, {
        method: 'delete'
    })
}
