import { html, render } from '../node_modules/lit-html/lit-html.js';
import { towns } from './towns.js';

const divWithTowns = document.querySelector('#towns');

const listTemplate = (towns, match) => html`
<ul>
   ${towns.map(t => html`<li class=${(match && t.toLowerCase().includes(match.toLowerCase())) ? 'active' : '' }>${t}
   </li>`)}
</ul>
`;

render(listTemplate(towns), divWithTowns);

document.querySelector('button').addEventListener('click', search);


function search(ev) {
   const parent = ev.target.parentNode;
   parent.querySelector('#result').textContent = '';
   
   const input = parent.querySelector('#searchText');
   
   render(listTemplate(towns, input.value), divWithTowns);
   
   let count = parent.querySelectorAll('.active').length;
   let result = count == 1 ? ' match found' : ' matches found';
   parent.querySelector('#result').textContent = count + result;
   input.value = '';
}
