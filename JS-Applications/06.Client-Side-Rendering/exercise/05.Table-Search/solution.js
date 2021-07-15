import { html, render } from '../node_modules/lit-html/lit-html.js';

const tableBody = document.querySelector('tbody');
document.querySelector('#searchBtn').addEventListener('click', onClick);

const templateTable = (d, match) =>
   html`
   <tr class=${match ? 'select' : ''}>
      <td>${`${d.firstName} ${d.lastName}`}</td>
      <td>${d.email}</td>
      <td>${d.course}</td>
   </tr>
   `;

async function loadData(match) {
   const data = await getData();
   const result = Object.values(data).map(e => templateTable(e, isMatch(e, match)));
   render(result, tableBody);
}

loadData();

function isMatch(obj, match) {
   const arr = Object.values(obj);
   return arr.some(el => match && el.toLowerCase().includes(match.toLowerCase()));
}

async function getData() {
   const response = await fetch('http://localhost:3030/jsonstore/advanced/table');
   if (response.ok) {
      return await response.json();
   } else {
      const err = await response.json();
      alert(err.message);
   }
}

function onClick() {
   const input = document.querySelector('#searchField');
   loadData(input.value);
   input.value = '';
}