import {html, render} from '../node_modules/lit-html/lit-html.js';

document.querySelector('#btnLoadTowns').addEventListener('click', onClick);
const template = (cities) => html`
<ul>
    ${cities.map(c => html`<li>${c}</li>`)}
</ul>
`;

function onClick(ev){
    ev.preventDefault();
    const body = ev.target.parentNode.parentNode;
    const inputField = body.querySelector('#towns');
    const towns = inputField.value.split(',').map(x => x.trim());
    render(template(towns), body.querySelector('#root'));
    inputField.value = '';
}
