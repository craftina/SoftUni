import { html, render } from '../../node_modules/lit-html/lit-html.js';

const notificationTemplate = (msg) => html`
<section id="notification" @click=${clear}>
    ${msg}
    <span style="margin: auto;">\u2716</span>
</section>
`;

const container = document.getElementById('notification-holder');

export function notify(msg){
    render(notificationTemplate(msg), container);
    setTimeout(clear, 3000);
}


export function clear(){
    render('', container);
}