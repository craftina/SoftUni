import { html } from '../../node_modules/lit-html/lit-html.js';
import { until } from '../../node_modules/lit-html/directives/until.js';
import { getItems } from '../api/data.js';
import { singleItemTemplate } from './common/item.js';

const catalogTemplate = (dataAll, search, onSearch) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Welcome to Furniture System</h1>
        <p>Select furniture from the catalog to view details.</p>
        <input id="searchInput" type="text" name="search" .value=${search}>
        <button @click=${onSearch}>Search</button>
    </div>
</div>
<div class="row space-top">
    ${dataAll.map(singleItemTemplate)}
</div>
`;

const loaderTemplate = html`
<p>Loading&hellip;</p>
`;

export async function showCatalog(ctx) {
    // function about loading from lit-html
    
    const searchParam = ctx.querystring.split('=')[1] || '';
    /*
    const items = await getItems(searchParam);
    ctx.render(catalogTemplate(items, searchParam, onSearch), loaderTemplate);*/
    ctx.render(until(populateTemplate(), loaderTemplate));

    function onSearch (ev){
       const search = encodeURIComponent(document.getElementById('searchInput').value);
       ctx.page.redirect('/?search=' + search);
    }
     
    async function populateTemplate(){
    const items = await getItems(searchParam);
    return catalogTemplate(items, searchParam, onSearch);
    }
}
