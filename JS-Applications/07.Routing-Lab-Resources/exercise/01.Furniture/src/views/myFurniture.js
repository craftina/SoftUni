import { html } from '../../node_modules/lit-html/lit-html.js';
import { getUserItems } from '../api/data.js';
import { singleItemTemplate } from './common/item.js';

const catalogUserTemplate = (dataAll) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>My Furniture</h1>
        <p>This is a list of your publications.</p>
    </div>
</div>
<div class="row space-top">
    ${dataAll.map(singleItemTemplate)}
</div>
`;


export async function showUserItems(ctx) {
   // function about loading from lit-html
   const items = await getUserItems();
   ctx.render(catalogUserTemplate(items));
}