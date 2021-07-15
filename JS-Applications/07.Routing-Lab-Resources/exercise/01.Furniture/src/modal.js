import { html, render } from '../../node_modules/lit-html/lit-html.js';

const modalTemplate = (msg, onChoice) => html`
<div id="modal">
    <p>${msg}</p>
    <button @click=${()=> onChoice(true)}>Ok</button>
    <button @click=${()=> onChoice(false)}>Cancel</button>
</div>
`;

const overlay = document.createElement('div');
overlay.id = 'overlay';

export function createModal(msg, callback) {
    /*
    render(modalTemplate(msg, onChoice), overlay);
    document.body.appendChild(overlay);

    function onChoice(choice){
        clearModal();
        callback(choice);
    }*/

    return new Promise((callback) => {
        render(modalTemplate(msg, onChoice), overlay);
        document.body.appendChild(overlay);

        function onChoice(choice){
            clearModal();
            callback(choice);
        }
    })
}

export function clearModal() {
    overlay.remove();
}