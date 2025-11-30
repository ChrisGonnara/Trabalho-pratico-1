const API_URL = 'http://localhost:3000';

function getUsuarioLogado() {
const dados = sessionStorage.getItem('usuarioLogado');
return dados ? JSON.parse(dados) : null;
}

function setUsuarioLogado(usuario) {
sessionStorage.setItem('usuarioLogado', JSON.stringify(usuario));
}

function limparSessao() {
sessionStorage.removeItem('usuarioLogado');
}

async function configurarMenu() {
const usuario = getUsuarioLogado();
const spanUser = document.getElementById('texto-usuario');
const btnLogin = document.getElementById('btn-login');
const btnLogout = document.getElementById('btn-logout');
const menuCadastro = document.getElementById('menu-cadastro-itens');
const menuFavoritos = document.getElementById('menu-favoritos');

if (!spanUser || !btnLogin || !btnLogout) return;

if (usuario) {
    spanUser.textContent = `Olá, ${usuario.nome}`;
    btnLogin.classList.add('d-none');
    btnLogout.classList.remove('d-none');
    btnLogout.onclick = () => {
    limparSessao();
    window.location.href = 'index.html';
    };

    if (usuario.admin && menuCadastro) {
    menuCadastro.classList.remove('d-none');
    }
    if (menuFavoritos) {
    menuFavoritos.classList.remove('d-none');
    }
} else {
    spanUser.textContent = '';
    btnLogin.classList.remove('d-none');
    btnLogout.classList.add('d-none');
    if (menuCadastro) menuCadastro.classList.add('d-none');
    if (menuFavoritos) menuFavoritos.classList.add('d-none');
}
}

document.addEventListener('DOMContentLoaded', configurarMenu);
