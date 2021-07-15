import { html} from '../node_modules/lit-html/lit-html.js';

const rowTemplate = (data) => html`
<tr id=${data._id}>
    <td>${data.title}</td>
    <td>${data.author}</td>
    <td>
        <button class="editBtn">Edit</button>
        <button class="deleteBtn">Delete</button>
    </td>
</tr>
`;

const tableTemplate = (ctx) => html`
<table>
    <thead>
        <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Action</th>
        </tr>
    </thead>
    <tbody @click=${e => onButton(e, ctx)}>
        ${Object.values(ctx.list).map(rowTemplate)}
    </tbody>
</table>
`;

const addFormTemplate = () => html`
<form id="add-form">
    <h3>Add book</h3>
    <label>TITLE</label>
    <input type="text" name="title" placeholder="Title...">
    <label>AUTHOR</label>
    <input type="text" name="author" placeholder="Author...">
    <input type="submit" value="Submit">
</form>
`;

const editFormTemplate = (book) => html`
<form id="edit-form">
    <input type="hidden" name="_id" .value=${book._id}>
    <h3>Edit book</h3>
    <label>TITLE</label>
    <input type="text" name="title" placeholder="Title.." .value=${book.title}>
    <label>AUTHOR</label>
    <input type="text" name="author" placeholder="Author..." .value=${book.author}>
    <input type="submit" value="Save">
</form>
`;

export const layoutTemplate = (ctx, bookToEdit) => html`
<button @click=${ctx.load} id="loadBooks">LOAD ALL BOOKS</button>
${tableTemplate(ctx)}
${bookToEdit ? editFormTemplate(bookToEdit) : addFormTemplate()}
`;

function onButton(ev, ctx) {
    const id = ev.target.parentNode.parentNode.id;
    if (ev.target.classList.contains('editBtn')) {
        ctx.onEdit(id);
    } else if (ev.target.classList.contains('deleteBtn')) {
        ctx.onDelete(id);
    }
}
