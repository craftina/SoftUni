import {html, render} from "../node_modules/lit-html/lit-html.js";
import {styleMap} from "../node_modules/lit-html/directives/style-map.js";
import {cats} from './catSeeder.js';

const section = document.querySelector('#allCats');
section.addEventListener('click', onClick);

const template = (data) => html`
<ul>
    ${data.map(c => html`
    <li>
        <img src=${`./images/${c.imageLocation}.jpg`} width="250" height="250" alt="Card image cap">
        <div class="info">
            <button class="showBtn">${c.info ? 'Hide' : 'Show'} status code</button>
            <div class="status" style=${styleMap(c.info ? {} : {display: 'none'})} id=${c.id}>
                <h4>Status Code: ${c.statusCode}</h4>
                <p>${c.statusMessage}</p>
            </div>
        </div>
    </li>
    `)}
</ul>
`;
cats.forEach(c => c.info = false);
render(template(cats), section);

function onClick(ev){
    if(ev.target.classList.contains('showBtn')){
        const elementId = ev.target.parentNode.querySelector('.status').id;
        const cat = cats.find(c => c.id == elementId);
        cat.info = !cat.info;
        render(template(cats), section);
    }
}