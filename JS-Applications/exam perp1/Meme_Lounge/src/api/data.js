import {api} from './api.js';

const host = 'http://localhost:3030';
api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getMemes(){
        return await api.getData(host + '/data/memes?sortBy=_createdOn%20desc');
}

export async function getUserMemes(){
    const userId = sessionStorage.getItem('userId');
    return await api.getData(host + `/data/memes?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}

export async function getMemeById(id){
    return await api.getData(host + '/data/memes/' + id);
}

export async function postMeme(data){
    return await api.postData(host + '/data/memes', data);
}

export async function updateMeme(id, data){
    return await api.updateData(host + '/data/memes/' + id, data);
}

export async function deleteMeme(id){
    return await api.deleteData(host + '/data/memes/' + id);
}

// export async function searchArticle(){
//     return await api.getData(host + '/data/wiki?where=title%20LIKE%20%22{query}%22');
// }