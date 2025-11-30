async function verificarAdmin() {
const usuario = getUsuarioLogado();
if (!usuario || !usuario.admin) {
    alert('Apenas administradores podem acessar esta página.');
    window.location.href = 'index.html';
}
}

async function carregarTabela() {
const tbody = document.querySelector('#tabela-itens tbody');
const resp = await fetch(`${API_URL}/itens`);
const lista = await resp.json();
let html = '';

lista.forEach(item => {
    html += `
    <tr>
        <td>${item.id}</td>
        <td>${item.nome}</td>
        <td>${item.destaque ? 'Sim' : 'Não'}</td>
        <td>
        <button class="btn btn-sm btn-primary btn-editar" data-id="${item.id}">Editar</button>
        <button class="btn btn-sm btn-danger btn-excluir" data-id="${item.id}">Excluir</button>
        </td>
    </tr>`;
});

tbody.innerHTML = html;

document.querySelectorAll('.btn-editar').forEach(btn => {
    btn.addEventListener('click', () => editarItem(btn.dataset.id));
});
document.querySelectorAll('.btn-excluir').forEach(btn => {
    btn.addEventListener('click', () => excluirItem(btn.dataset.id));
});
}

async function salvarItem(e) {
e.preventDefault();
const id = document.getElementById('item-id').value;
const nome = document.getElementById('item-nome').value;
const imagemPrincipal = document.getElementById('item-imagemPrincipal').value;
const descricaoCurta = document.getElementById('item-descricaoCurta').value;
const caracteristicasTexto = document.getElementById('item-caracteristicas').value;
const maisFotosTexto = document.getElementById('item-maisFotos').value;
const destaque = document.getElementById('item-destaque').checked;

const corpo = {
    nome,
    imagemPrincipal,
    descricaoCurta,
    caracteristicas: caracteristicasTexto.split('\n').filter(l => l.trim()),
    maisFotos: maisFotosTexto.split('\n').filter(l => l.trim()),
    destaque
};

const url = id ? `${API_URL}/itens/${id}` : `${API_URL}/itens`;
const metodo = id ? 'PUT' : 'POST';

await fetch(url, {
    method: metodo,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(corpo)
});

document.getElementById('form-item').reset();
document.getElementById('item-id').value = '';
await carregarTabela();
}

async function editarItem(id) {
const resp = await fetch(`${API_URL}/itens/${id}`);
const item = await resp.json();

document.getElementById('item-id').value = item.id;
document.getElementById('item-nome').value = item.nome;
document.getElementById('item-imagemPrincipal').value = item.imagemPrincipal;
document.getElementById('item-descricaoCurta').value = item.descricaoCurta;
document.getElementById('item-caracteristicas').value = (item.caracteristicas || []).join('\n');
document.getElementById('item-maisFotos').value = (item.maisFotos || []).join('\n');
document.getElementById('item-destaque').checked = !!item.destaque;
}

async function excluirItem(id) {
if (!confirm('Tem certeza que deseja excluir?')) return;
await fetch(`${API_URL}/itens/${id}`, { method: 'DELETE' });
await carregarTabela();
}

document.addEventListener('DOMContentLoaded', async () => {
await verificarAdmin();
document.getElementById('form-item').addEventListener('submit', salvarItem);
document.getElementById('btn-limpar').addEventListener('click', () => {
    document.getElementById('form-item').reset();
    document.getElementById('item-id').value = '';
});
await carregarTabela();
});
