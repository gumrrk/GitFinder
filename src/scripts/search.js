import { baseUrl } from './index.js';

async function findUser(nameUser) {
    const response = await fetch(`${baseUrl}/${nameUser}`);
    const data = await response.json();
    const input = document.querySelector('#input-user');
    if (nameUser.trim() == "") {
        const errorDiv = document.createElement("div");
        errorDiv.classList.add("errorDiv");
        errorDiv.innerHTML = "Por favor, preencha os dados.";
        input.value = "";
        document.body.appendChild(errorDiv);

        setTimeout(() => {
            errorDiv.remove();
        }, 1800);
    } else if (response.ok && data.login.toLowerCase() === nameUser.toLowerCase()) {
        localStorage.setItem('nameUser', nameUser);
        localStorage.setItem('dataUser', JSON.stringify(data));
        window.location.replace('src/pages/profile.html');
    } else {
        window.location.replace('src/pages/error.html');
    }
}

function addFindUserToInput() {
    const input = document.querySelector('#input-user');
    const button = document.querySelector('#button-user');
    button.addEventListener('click', () => findUser(input.value.trim()));
    input.addEventListener('keypress', (event) => {
        if (event.keyCode === 13) {
            findUser(input.value.trim());
        }
    })
}
addFindUserToInput()