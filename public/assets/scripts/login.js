async function fazerLogin(e) {
e.preventDefault();
const login = document.getElementById('login-login').value;
const senha = document.getElementById('login-senha').value;
const divErro = document.getElementById('login-erro');

const resp = await fetch(`${API_URL}/usuarios?login=${encodeURIComponent(login)}&senha=${encodeURIComponent(senha)}`);
const dados = await resp.json();

if (dados.length === 1) {
    setUsuarioLogado(dados[0]);
    window.location.href = 'index.html';
} else {
    divErro.textContent = 'Login ou senha inválidos.';
}
}

async function cadastrarUsuario(e) {
e.preventDefault();
const nome = document.getElementById('cad-nome').value;
const login = document.getElementById('cad-login').value;
const email = document.getElementById('cad-email').value;
const senha = document.getElementById('cad-senha').value;
const divSucesso = document.getElementById('cad-sucesso');

const resp = await fetch(`${API_URL}/usuarios`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome, login, email, senha, admin: false })
});

if (resp.ok) {
    divSucesso.textContent = 'Usuário cadastrado com sucesso. Faça login.';
    document.getElementById('form-cadastro-usuario').reset();
}
}

document.addEventListener('DOMContentLoaded', () => {
document.getElementById('form-login').addEventListener('submit', fazerLogin);
document.getElementById('form-cadastro-usuario').addEventListener('submit', cadastrarUsuario);
});
