// PEGAR ELEMENTOS DO HTML
const form = document.querySelector('#post-form');
const inputTitle = document.getElementById('input-title');
const inputConteudo = document.getElementById('input-conteudo');

const responsePostagem = document.getElementById('response-post');

const btnGet = document.getElementById("btn-get");
const postList = document.getElementById("post-list");

// URL DA API
const API_URL = 'https://jsonplaceholder.typicode.com/posts';

// =========================
// 🔵 POST (ENVIAR)
// =========================
form.addEventListener('submit', async function(event) {
    event.preventDefault();

    const novaPostagem = {
        title: inputTitle.value,
        body: inputConteudo.value,
        userId: 1
    };

    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novaPostagem)
    });

    const retornoAPI = await response.json();

    responsePostagem.textContent = JSON.stringify(retornoAPI, null, 2);

    form.reset();
});

// =========================
// 🟢 GET (BUSCAR POSTS)
// =========================
let pagina = 1;

btnGet.addEventListener('click', async function () {
    const response = await fetch(`${API_URL}?_page=${pagina}&_limit=5`);
    const posts = await response.json();

    postList.innerHTML = ""; // 👈 AQUI

    posts.forEach(function(post) {
        const li = document.createElement('li');
        li.textContent = `${post.id} - ${post.title}`;
        postList.appendChild(li);
    });

    pagina++;
});