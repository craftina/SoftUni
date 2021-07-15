import { html } from '../../node_modules/lit-html/lit-html.js';
import { postItem } from '../api/data.js';
import {clear, notify} from '../notification.js';

const createTemplate = (onSubmit, isValid, validation) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Create New Furniture</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
<form @submit=${onSubmit}>
    <div class="row space-top">
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-make">Make</label>
                <input class="form-control ${isValid ? isValid(validation.validMake()) : ''}" id="new-make" type="text"
                    name="make">
            </div>
            <div class="form-group has-success">
                <label class="form-control-label" for="new-model">Model</label>
                <input class="form-control ${isValid ? isValid(validation.validModel()) : ''}" id="new-model"
                    type="text" name="model">
            </div>
            <div class="form-group has-danger">
                <label class="form-control-label" for="new-year">Year</label>
                <input class="form-control ${isValid ? isValid(validation.validYear()) : ''}" id="new-year"
                    type="number" name="year">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-description">Description</label>
                <input class="form-control ${isValid ? isValid(validation.validDescr()) : ''}" id="new-description"
                    type="text" name="description">
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-price">Price</label>
                <input class="form-control ${isValid ? isValid(validation.validPrice()) : ''}" id="new-price"
                    type="number" name="price">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-image">Image</label>
                <input class="form-control ${isValid ? isValid(validation.validImage()) : ''}" id="new-image"
                    type="text" name="img">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-material">Material (optional)</label>
                <input class="form-control" id="new-material" type="text" name="material">
            </div>
            <input type="submit" class="btn btn-info" value="Create" />
        </div>
    </div>
</form>
`;

export async function createItem(ctx) {
    ctx.render(createTemplate(onSubmit));

    async function onSubmit(ev) {
        ev.preventDefault();

        // [...ev.target.querySelectorAll('input')].forEach(i => i.disabled = true);
        const formData = new FormData(ev.target);
        const item = {
            make: formData.get('make').trim(),
            model: formData.get('model').trim(),
            description: formData.get('description').trim(),
            year: formData.get('year').trim(),
            price: formData.get('price').trim(),
            img: formData.get('img').trim(),
            material: formData.get('material') ? formData.get('material').trim() : '',
            _ownerId: sessionStorage.getItem('userId')
        }

        const isValid = (validation) => validation ? 'is-valid' : 'is-invalid';
        const validation = {
            validMake: () => item.make.length >= 4 ? true : false,
            validModel: () => item.model.length >= 4 ? true : false,
            validYear: () => Number(item.year) >= 1950 && Number(item.year) <= 2050 ? true : false,
            validDescr: () => item.description.length >= 10 ? true : false,
            validPrice: () => Number(item.price) > 0 ? true : false,
            validImage: () => item.img !== '' ? true : false,
        };

        if (Object.keys(validation).some(k => validation[k]() == false)) {
            const err = 'Some fields have incorrect data!';
            ctx.render(createTemplate(onSubmit, isValid, validation));
            return notify(err);
        }

        // try{
            await postItem(item);
            clear();
            ctx.page.redirect('/');
        // } catch(err){

        // } finally{
        //     [...ev.target.querySelectorAll('input')].forEach(i => i.disabled = false);
        // }
    }
}