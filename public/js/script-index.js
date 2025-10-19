document.addEventListener('DOMContentLoaded', () => {
    
    const carouselInner = document.getElementById('carousel-inner-container');
    const carouselIndicadores = document.getElementById('carousel-indicadores');
    const gridRacas = document.getElementById('grid-todas-racas');

    const nomesRacas = Object.keys(racas);
    
    let carouselHTML = '';
    let indicadoresHTML = '';
    let gridHTML = '';

    nomesRacas.forEach((nomeRaca, index) => {
        const dadosRaca = racas[nomeRaca];
        
        // --- 1. POPULAR O CARROSSEL (com as 3 primeiras raças) ---
        if (index < 3) { 
            const activeClass = index === 0 ? 'active' : ''; 

            carouselHTML += `
                <div class="carousel-item ${activeClass}">
                    <a href="raca.html?raca=${encodeURIComponent(nomeRaca)}">
                        <img src="${dadosRaca.imagemPrincipal}" class="d-block w-100 carousel-img" alt="${nomeRaca}">
                        <div class="carousel-caption d-none d-md-block">
                            <h5>${nomeRaca}</h5>
                            <p>${dadosRaca.descricaoCurta}</p>
                        </div>
                    </a>
                </div>
            `;
            
            indicadoresHTML += `
                <button type="button" data-bs-target="#carouselDestaques" data-bs-slide-to="${index}" class="${activeClass}" aria-current="${index === 0 ? 'true' : 'false'}" aria-label="Slide ${index + 1}"></button>
            `;
        }
        
        // --- 2. POPULAR O GRID (com todas as raças) ---
        const linkRaca = `raca.html?raca=${encodeURIComponent(nomeRaca)}`;
        
        gridHTML += `
            <div class="col-6 col-md-4 col-lg-3">
                <a href="${linkRaca}" class="card-raca">
                    <img src="${dadosRaca.imagemPrincipal}" alt="${nomeRaca}">
                    <span>${nomeRaca}</span>
                </a>
            </div>
        `;
    });

    if (carouselInner) carouselInner.innerHTML = carouselHTML;
    if (carouselIndicadores) carouselIndicadores.innerHTML = indicadoresHTML;
    if (gridRacas) gridRacas.innerHTML = gridHTML;
});