import page from '../node_modules/page/page.mjs';
import {render} from '../node_modules/lit-html/lit-html.js';

import * as api from './api/data.js';

import {showCatalog} from './views/catalog.js';
import {showDetails} from './views/details.js';
import {createItem} from './views/create.js';
import {editItem} from './views/edit.js';
import {registerUser} from './views/register.js';
import {loginUser} from './views/login.js';
import {showUserItems} from './views/myFurniture.js';

const container = document.querySelector('.container');

page('/', decorateContext, showCatalog);
page('/details/:id', decorateContext, showDetails);
page('/create', decorateContext, createItem);
page('/edit/:id', decorateContext, editItem);
page('/register', decorateContext, registerUser);
page('/login', decorateContext, loginUser);
page('/my-furniture', decorateContext, showUserItems);

document.getElementById('logoutBtn').addEventListener('click', async () => {
    await api.logout();
    setUserNav();
    page.redirect('/');
});

setUserNav();
page.start();

function decorateContext(ctx, next){
    ctx.render = (content) => render(content, container);
    ctx.setUserNav = setUserNav;
    next();
}

function setUserNav (){
    const userId = sessionStorage.getItem('userId');
    if(userId != null){
        document.getElementById('user').style.display = 'inline-block';
        document.getElementById('guest').style.display = 'none';
    } else{
        document.getElementById('user').style.display = 'none';
        document.getElementById('guest').style.display = 'inline-block';
    }
}