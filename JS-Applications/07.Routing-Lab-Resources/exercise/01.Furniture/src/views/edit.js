import { html } from '../../node_modules/lit-html/lit-html.js';
import { getItemById, updateItem } from '../api/data.js';

const editTemplate = (data, onSubmit, errorMsg, isValid, validation) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Edit Furniture</h1>
        <p>Please fill all fields.</p>
        ${errorMsg ? html`
        <div style="color: red">
            <p>${errorMsg}</p>
        </div>
        `: ""}
    </div>
</div>
<form @submit=${onSubmit}>
    <div class="row space-top">
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-make">Make</label>
                <input class="form-control ${isValid ? isValid(validation.validMake()) : ''}" id="new-make" type="text"
                    name="make" .value=${data.make}>
            </div>
            <div class="form-group has-success">
                <label class="form-control-label" for="new-model">Model</label>
                <input class="form-control ${isValid ? isValid(validation.validModel()) : ''}" id="new-model"
                    type="text" name="model" .value=${data.model}>
            </div>
            <div class="form-group has-danger">
                <label class="form-control-label" for="new-year">Year</label>
                <input class="form-control ${isValid ? isValid(validation.validYear()) : ''}" id="new-year"
                    type="number" name="year" .value=${data.year}>
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-description">Description</label>
                <input class="form-control ${isValid ? isValid(validation.validDescr()) : ''}" id="new-description"
                    type="text" name="description" .value=${data.description}>
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-price">Price</label>
                <input class="form-control ${isValid ? isValid(validation.validPrice()) : ''}" id="new-price"
                    type="number" name="price" .value=${data.price}>
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-image">Image</label>
                <input class="form-control ${isValid ? isValid(validation.validImage()) : ''}" id="new-image"
                    type="text" name="img" .value=${data.img}>
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-material">Material (optional)</label>
                <input class="form-control" id="new-material" type="text" name="material" .value=${data.material}>
            </div>
            <input type="submit" class="btn btn-info" value="Edit" />
        </div>
    </div>
</form>
`;



export async function editItem(ctx) {
    const data = await getItemById(ctx.params.id);
    ctx.render(editTemplate(data, onSubmit));

    async function onSubmit(ev) {
        ev.preventDefault();
        const formData = new FormData(ev.target);
        const item = {
            make: formData.get('make').trim(),
            model: formData.get('model').trim(),
            description: formData.get('description').trim(),
            year: formData.get('year').trim(),
            price: formData.get('price').trim(),
            img: formData.get('img').trim(),
            material: formData.get('material') ? formData.get('material').trim() : ''
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
            return ctx.render(editTemplate(item, onSubmit, err, isValid, validation));
        }

        await updateItem(data._id, item);
        ctx.page.redirect('/');
    }
}