import {html, render} from '../node_modules/lit-html/lit-html.js';

const menu = document.querySelector('#menu');
const template = (data) => Object.values(data).map(d => html`<option value=${d._id}>${d.text}</option>`);
document.querySelector('form').addEventListener('submit', addItem);

async function loadData (){
    render(template(await getData()), menu);
}

loadData();

async function getData (){
    const response = await fetch('http://localhost:3030/jsonstore/advanced/dropdown');
    if(response.ok){
        return await response.json();
    } else{
        const err = await response.json();
        alert(err.message);
    }
}

async function postData(text){
    const response = await fetch('http://localhost:3030/jsonstore/advanced/dropdown', {
        method: 'post',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(text)
    });
    if(response.ok == false){
        const err = await response.json();
       return alert(err.message);
    }
}

async function addItem(ev) {
    ev.preventDefault();
    const data = new FormData(ev.target);
    const text = data.get('text');
    await postData({text});
    loadData();
    ev.target.reset();
}