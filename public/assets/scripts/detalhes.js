async function initDetalhes() {
const params = new URLSearchParams(window.location.search);
const id = params.get('id');
if (!id) return;

const resp = await fetch(`${API_URL}/itens/${id}`);
if (!resp.ok) return;

const item = await resp.json();

const titulo = document.getElementById('titulo-raca');
const img = document.getElementById('imagem-principal-raca');
const lista = document.getElementById('lista-caracteristicas');
const gridFotos = document.getElementById('grid-mais-fotos');
const btnFav = document.getElementById('btn-favorito-detalhe');

titulo.textContent = item.nome;
img.src = item.imagemPrincipal;
img.alt = `Foto principal da raça ${item.nome}`;

lista.innerHTML = '';
(item.caracteristicas || []).forEach(c => {
    lista.innerHTML += `<li class="list-group-item">${c}</li>`;
});

gridFotos.innerHTML = '';
(item.maisFotos || []).forEach(f => {
    gridFotos.innerHTML += `
    <div class="col-6 col-md-4">
        <img src="${f}" alt="Foto extra de ${item.nome}" class="img-fluid rounded">
    </div>`;
});

await carregarFavoritosUsuario();
atualizarIcone();

btnFav.addEventListener('click', async () => {
    await toggleFavorito(item.id);
    atualizarIcone();
});

function atualizarIcone() {
    const marcado = isFavorito(item.id);
    btnFav.textContent = marcado ? '♥' : '♡';
    btnFav.classList.toggle('text-danger', marcado);
}
}

document.addEventListener('DOMContentLoaded', initDetalhes);
