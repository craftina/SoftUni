import { render } from '../node_modules/lit-html/lit-html.js';
import { layoutTemplate } from './templates.js';
import * as api from './api.js';

const onSubmit = {
    'add-form': onCreate,
    'edit-form': onEditSubmit
}

const ctx = {
    list: [],
    load: async () => {
        ctx.list = await api.getAllData();
        loadBooks();
    },
    onEdit(id) {
        const book = ctx.list.find(b => b._id == id);
        loadBooks(book);
    },
    async onDelete(id) {
        const confirmed = confirm('Are you sure you want to delete this book?')
        if (confirmed) {
            await api.deleteData(id);
            ctx.list = await api.getAllData();
            loadBooks();
        }
    }
}

document.body.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const formData = new FormData(ev.target);
    console.log(ev.target.id);
    onSubmit[ev.target.id](formData, ev.target);
})

start();


async function start() {
    loadBooks();
}

async function loadBooks(bookToEdit) {
    const result = layoutTemplate(ctx, bookToEdit)
    return render(result, document.body);
}

async function onCreate(formData, form) {

    const book = {
        title: formData.get('title'),
        author: formData.get('author')
    }
    if (book.title !== '' && book.author !== '') {
        await api.postData(book);
        form.reset();
    } else {
        alert(`All fields must be filled!`);
    }
}



async function onEditSubmit(formData, form) {
    const id = formData.get('_id');
    const book = {
        title: formData.get('title'),
        author: formData.get('author'),
    }
    if (book.title !== '' && book.author !== '') {
        await api.updateData(book, id);
        loadBooks();
        form.reset();
    } else {
        alert(`All fields must be filled!`);
    }
}



