function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function mostrarRaca(nomeRaca) {
    
    const titulo = document.getElementById("titulo-raca");
    const imagemPrincipal = document.getElementById("imagem-principal-raca");
    const listaCaracteristicas = document.getElementById("lista-caracteristicas");
    const gridMaisFotos = document.getElementById("grid-mais-fotos");
    
    const dadosRaca = racas[nomeRaca];

    if (dadosRaca) {
        titulo.textContent = nomeRaca;
        
        imagemPrincipal.src = dadosRaca.imagemPrincipal;
        imagemPrincipal.alt = `Foto principal da raça ${nomeRaca}`;
        
        listaCaracteristicas.innerHTML = ""; 
        dadosRaca.caracteristicas.forEach(item => {
            listaCaracteristicas.innerHTML += `<li class="list-group-item">${item}</li>`;
        });
        
        gridMaisFotos.innerHTML = ""; 
        dadosRaca.maisFotos.forEach(fotoSrc => {
            gridMaisFotos.innerHTML += `
                <div class="col-6 col-md-4">
                    <img src="${fotoSrc}" alt="Foto extra de ${nomeRaca}" class="img-fluid rounded">
                </div>
            `;
        });

    } else {
        titulo.textContent = "Raça não encontrada";
        document.querySelector(".info-geral .row").innerHTML = "<p>Desculpe, não encontramos informações sobre esta raça.</p>";
        document.querySelector(".mais-fotos").style.display = "none";
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const racaSelecionada = getQueryParam("raca");
    
    if (racaSelecionada) {
        mostrarRaca(racaSelecionada);
    } else {
        document.getElementById("titulo-raca").textContent = "Nenhuma raça selecionada";
        document.querySelector(".info-geral .row").innerHTML = "<p>Volte para a página inicial e selecione uma raça.</p>";
        document.querySelector(".mais-fotos").style.display = "none";
    }
});