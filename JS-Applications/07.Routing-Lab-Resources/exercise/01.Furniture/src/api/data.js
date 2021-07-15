import {api} from './api.js';

const host = 'http://localhost:3030';
api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getItems(search){
    if(search){
        return await api.getData(host + '/data/catalog/?where=' + encodeURIComponent(`make LIKE "${search}"`));
    }else{
        return await api.getData(host + '/data/catalog');
    }
}

export async function getItemById(id){
    return await api.getData(host + '/data/catalog/' + id);

}

export async function getUserItems(){
    const userId = sessionStorage.getItem('userId');
    return await api.getData(`${host}/data/catalog?where=_ownerId%3D%22${userId}%22`);
}

export async function postItem(data){
    return await api.postData(host + '/data/catalog', data);
}

export async function updateItem(id, data){
    return await api.updateData(host + '/data/catalog/' + id, data);
}

export async function deleteItem(id){
    return await api.deleteData(host + '/data/catalog/' + id);
}