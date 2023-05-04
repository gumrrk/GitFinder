import { baseUrl } from './index.js';

const nameUser = localStorage.getItem('nameUser');
console.log(nameUser);
const dataUser = JSON.parse(localStorage.getItem('dataUser'));
console.log(dataUser);

async function fetchUserRepos(nameUser) {
    try {
        const response = await fetch(`${baseUrl}/${nameUser}/repos`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function initRepos() {
    const repos = await fetchUserRepos(nameUser);
    if (repos) {
        renderPageUser(repos);
    } else {
        window.location.replace('./error.html');
    }
}

function addEventChangeUserToButton() {
    const button = document.querySelector('#button-change');
    button.addEventListener('click', () => {
        localStorage.clear();
        window.location.replace('../../index.html');
    });
}

function renderPageUser(repos) {
    const loading = document.querySelector('.loading-div');
    loading.style.display = 'none';

    const dataUser = JSON.parse(localStorage.getItem('dataUser'));

    const icon = document.querySelector('#icon-user');
    icon.src = dataUser.avatar_url;
    icon.style.cursor = "pointer";

    const targetIcon = document.querySelector('#a-icon-user');
    targetIcon.href = dataUser.avatar_url;

    const name = document.querySelector('#name-user');
    name.style.cursor = 'pointer';
    name.title = `@${dataUser.login}`;
    if (dataUser.name != null) {
        name.textContent = dataUser.name;
        name.href = `https://github.com/${nameUser}`;
    }
    else {
        name.textContent = dataUser.login;
        name.href = `https://github.com/${dataUser.login}`
    }

    const location = document.querySelector('.location-user');
    location.textContent = dataUser.location

    const section = document.querySelector('#section-posts');
    const ul = document.createElement('ul');

    if (repos.length > 0) {
        repos.forEach(repo => {
            const li = document.createElement('li');
            const div = document.createElement('div');
            const h1 = document.createElement('h1');
            const p = document.createElement('p');
            const button = document.createElement('button');

            h1.textContent = repo.name;
            p.textContent = repo.description;
            button.textContent = 'Repositório';
            button.addEventListener('click', () => window.open(repo.html_url));

            div.append(h1, p, button);
            li.appendChild(div);
            ul.appendChild(li);
            section.appendChild(ul);
        })
    } else {
        const section = document.querySelector('#section-posts')
        const div = document.createElement('div');
        const h1 = document.createElement('h1');

        div.appendChild(h1);
        section.appendChild(div);

        h1.textContent = 'Não há nenhum repositório público para mostrar.'

        div.classList.add('div-empty');
        h1.classList.add('h1-div-empty');
    }
}

initRepos();
addEventChangeUserToButton();
