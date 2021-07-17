import { html } from '../../node_modules/lit-html/lit-html.js';
import { register } from '../api/data.js';
import { notify } from '../notification.js';

const registerTemplate = (onSubmit) => html`
<section id="register">
    <form @submit=${onSubmit} id="register-form">
        <div class="container">
            <h1>Register</h1>
            <label for="username">Username</label>
            <input id="username" type="text" placeholder="Enter Username" name="username">
            <label for="email">Email</label>
            <input id="email" type="text" placeholder="Enter Email" name="email">
            <label for="password">Password</label>
            <input id="password" type="password" placeholder="Enter Password" name="password">
            <label for="repeatPass">Repeat Password</label>
            <input id="repeatPass" type="password" placeholder="Repeat Password" name="repeatPass">
            <div class="gender">
                <input type="radio" name="gender" id="female" value="female">
                <label for="female">Female</label>
                <input type="radio" name="gender" id="male" value="male">
                <label for="male">Male</label>
            </div>
            <input type="submit" class="registerbtn button" value="Register">
            <div class="container signin">
                <p>Already have an account?<a href="/logins">Sign in</a>.</p>
            </div>
        </div>
    </form>
</section>
`;

export async function registerPage(ctx) {
    ctx.render(registerTemplate(onSubmit));

    async function onSubmit(ev) {
        ev.preventDefault();
        const formData = new FormData(ev.target);
        const user = {
            username: formData.get('username'),
            email: formData.get('email'),
            password: formData.get('password'),
            gender: formData.get('gender'),
        }
        const repeatPass = formData.get('repeatPass');
        try {
            if (user.username == '' || user.email == '' || user.password == '' || user.gender == null) {
                throw new Error('All fields are required!');
            } else if (user.password !== repeatPass) {
                throw new Error('Passwords don\'t match!');
            }
            await register(user);
            ctx.setUserNav();
            ctx.page.redirect('/catalogue');
        } catch (err) {
            notify(err.message);
        }


    }

}