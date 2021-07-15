import { html } from '../../node_modules/lit-html/lit-html.js';
import { login } from '../api/data.js';

const loginTemplate = (onSubmit, errMsg, invalidEmail, invalidPass) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Login User</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
<form @submit=${onSubmit}>
    <div class="row space-top">
        <div class="col-md-4">
        ${errMsg? html`
            <div class="form-group" style="background-color: #ff6666; color: black" >
                <p>${errMsg}</p>
            </div>
            `: ""}
            <div class="form-group">
                <label class="form-control-label" for="email">Email</label>
                <input class=${"form-control" + (invalidEmail ? ' is-invalid' : '')} id="email" type="text" name="email">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="password">Password</label>
                <input class=${"form-control" + (invalidPass ? ' is-invalid' : '')} id="password" type="password" name="password">
            </div>
            <input type="submit" class="btn btn-primary" value="Login" />
        </div>
    </div>
</form>
`;

export async function loginUser(ctx) {
    ctx.render(loginTemplate(onSubmit));

    async function onSubmit(ev){
        ev.preventDefault();
        const formData = new FormData(ev.target);
        const email = formData.get('email').trim();
        const password = formData.get('password').trim();
    
        try{
            await login(email, password);
        } catch(err){
            return ctx.render(loginTemplate(onSubmit, err.message, true, true));
        }
        ctx.setUserNav();
        ctx.page.redirect('/');
    }
}