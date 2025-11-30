let itens = [];
let favoritosUsuario = [];

async function carregarFavoritosUsuario() {
const usuario = getUsuarioLogado();
if (!usuario) {
    favoritosUsuario = [];
    return;
}
const resp = await fetch(`${API_URL}/favoritos?usuarioId=${usuario.id}`);
favoritosUsuario = await resp.json();
}

function isFavorito(idItem) {
return favoritosUsuario.some(f => f.itemId === idItem);
}

async function toggleFavorito(idItem) {
const usuario = getUsuarioLogado();
if (!usuario) {
    alert('Faça login para marcar favoritos.');
    return;
}

const existente = favoritosUsuario.find(f => f.itemId === idItem && f.usuarioId === usuario.id);

if (existente) {
    await fetch(`${API_URL}/favoritos/${existente.id}`, { method: 'DELETE' });
} else {
    const resp = await fetch(`${API_URL}/favoritos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ usuarioId: usuario.id, itemId: idItem })
    });
    const novo = await resp.json();
    favoritosUsuario.push(novo);
}

await carregarFavoritosUsuario();
montarGrid(itens);
}

function montarCarousel() {
const carouselInner = document.getElementById('carousel-inner-container');
const carouselIndicadores = document.getElementById('carousel-indicadores');
let htmlItens = '';
let htmlInd = '';

const destaques = itens.filter(i => i.destaque).slice(0, 3);

destaques.forEach((item, index) => {
    const active = index === 0 ? 'active' : '';
    htmlItens += `
    <div class="carousel-item ${active}">
        <a href="raca.html?id=${item.id}">
        <img src="${item.imagemPrincipal}" class="d-block w-100 carousel-img" alt="${item.nome}">
        <div class="carousel-caption d-none d-md-block">
            <h5>${item.nome}</h5>
            <p>${item.descricaoCurta}</p>
        </div>
        </a>
    </div>`;
    htmlInd += `
    <button type="button" data-bs-target="#carouselDestaques" data-bs-slide-to="${index}" class="${active}" aria-label="Slide ${index + 1}"></button>`;
});

carouselInner.innerHTML = htmlItens;
carouselIndicadores.innerHTML = htmlInd;
}

function montarGrid(lista) {
const grid = document.getElementById('grid-todas-racas');
const usuario = getUsuarioLogado();
let html = '';

lista.forEach(item => {
    const marcado = isFavorito(item.id);
    const icone = marcado ? '♥' : '♡';
    const classe = marcado ? 'text-danger' : 'text-secondary';

    html += `
    <div class="col-6 col-md-4 col-lg-3">
        <div class="card h-100 text-center">
        <a href="raca.html?id=${item.id}" class="card-raca">
            <img src="${item.imagemPrincipal}" alt="${item.nome}">
            <span>${item.nome}</span>
        </a>
        ${usuario ? `<button class="btn btn-link ${classe} btn-fav" data-id="${item.id}" style="font-size:1.5rem;">${icone}</button>` : ''}
        </div>
    </div>`;
});

grid.innerHTML = html;

document.querySelectorAll('.btn-fav').forEach(btn => {
    btn.addEventListener('click', (e) => {
    const idItem = Number(e.currentTarget.dataset.id);
    toggleFavorito(idItem);
    });
});
}

function configurarBusca() {
const campo = document.getElementById('campo-busca');
const btn = document.getElementById('btn-buscar');

function aplicarBusca() {
    const termo = campo.value.toLowerCase().trim();
    if (!termo) {
    montarGrid(itens);
    return;
    }
    const filtrados = itens.filter(i =>
    i.nome.toLowerCase().includes(termo) ||
    i.descricaoCurta.toLowerCase().includes(termo)
    );
    montarGrid(filtrados);
}

btn.addEventListener('click', aplicarBusca);
campo.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') aplicarBusca();
    if (!campo.value) montarGrid(itens);
});
}

function montarGraficoEnergia() {
if (typeof Chart === 'undefined') return;

const ctx = document.getElementById('grafico-energia');
if (!ctx) return;

const categorias = {
    'Baixo/Médio': 0,
    'Alto': 0,
    'Muito Alto/Extremo': 0
};

itens.forEach(i => {
    const texto = (i.caracteristicas?.[0] || '').toLowerCase();
    if (texto.includes('muito alto') || texto.includes('extremamente')) {
    categorias['Muito Alto/Extremo']++;
    } else if (texto.includes('baixo') || texto.includes('médio')) {
    categorias['Baixo/Médio']++;
    } else {
    categorias['Alto']++;
    }
});

new Chart(ctx, {
    type: 'bar',
    data: {
    labels: Object.keys(categorias),
    datasets: [{
        label: 'Quantidade de raças',
        data: Object.values(categorias),
        backgroundColor: ['#41bcaa', '#f1c40f', '#e74c3c']
    }]
    },
    options: {
    responsive: true,
    scales: {
        y: { beginAtZero: true }
    }
    }
});
}

async function initHome() {
const resp = await fetch(`${API_URL}/itens`);
itens = await resp.json();
await carregarFavoritosUsuario();
montarCarousel();
montarGrid(itens);
configurarBusca();
montarGraficoEnergia();
}

document.addEventListener('DOMContentLoaded', initHome);
