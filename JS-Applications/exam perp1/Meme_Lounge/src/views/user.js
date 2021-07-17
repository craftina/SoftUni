import { html } from '../../node_modules/lit-html/lit-html.js';
import { getUserMemes } from '../api/data.js';

const userTemplate = (memes, username, email, gender) => html`
<section id="user-profile-page" class="user-profile">
    <article class="user-info">
        <img id="user-avatar-url" alt="user-profile" src="/images/${gender}.png">
        <div class="user-content">
            <p>Username: ${username}</p>
            <p>Email: ${email}</p>
            <p>My memes count: ${memes.length}</p>
        </div>
    </article>
    <h1 id="user-listings-title">User Memes</h1>
    <div class="user-meme-listings">
        ${memes.length == 0 ? html`
        <p class="no-memes">No memes in database.</p>`
         : memes.map(singleMeme)}
    </div>
</section>
`;

const singleMeme = (meme) => html`
<div class="user-meme">
    <p class="user-meme-title">${meme.title}</p>
    <img class="userProfileImage" alt="meme-img" src=${meme.imageUrl}>
    <a class="button" href="/details/${meme._id}">Details</a>
</div>
`;

export async function userPage(ctx) {
    const memes = await getUserMemes();
    const username = sessionStorage.getItem('username');
    const email = sessionStorage.getItem('email');
    const gender = sessionStorage.getItem('userGender');
    ctx.render(userTemplate(memes, username, email, gender));
}