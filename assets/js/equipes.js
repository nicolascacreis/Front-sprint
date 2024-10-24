document.addEventListener('DOMContentLoaded', function() {
    // Variáveis para navegação
    let currentIndex = 0; 
    let teams = []; 

    // Carregar equipes do JSON
    fetch('../data/equipes.json') 
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar o JSON');
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // Verificar os dados do JSON
            teams = data;
            displayTeams(); // Exibir a primeira equipe ao carregar
        })
        .catch(error => {
            console.error('Erro:', error);
        });

    // Exibir as equipes
    function displayTeams() {
        renderTeam(); // Renderiza a equipe atual ao iniciar
    }

    function renderTeam() {
        console.log('Renderizando equipe:', teams[currentIndex]); // Verificar qual equipe está sendo renderizada
        const teamList = document.getElementById('team-list');
        if (teams.length > 0) {
            teamList.innerHTML = `
                <div class="team">
                    <h2>${teams[currentIndex].name}</h2>
                    <img src="${teams[currentIndex].logo}" alt="${teams[currentIndex].name}" />
                    <p>${teams[currentIndex].description}</p>
                </div>
            `;
        }
    }

    // Função para mover o carrossel
    function moveCarousel(direction) {
        currentIndex += direction;

        // Loop entre o primeiro e o último
        if (currentIndex < 0) {
            currentIndex = teams.length - 1; // Volta para o último
        } else if (currentIndex >= teams.length) {
            currentIndex = 0; // Volta para o primeiro
        }

        // Renderiza a equipe atualizada
        renderTeam();
    }

    // Eventos de clique nos botões de navegação
    document.getElementById('prevBtn').addEventListener('click', function() {
        moveCarousel(-1); // Mover para a esquerda
    });

    document.getElementById('nextBtn').addEventListener('click', function() {
        moveCarousel(1); // Mover para a direita
    });

    // Código para o menu mobile
    let toggleMenu = document.querySelector('.bar');
    let menu = document.querySelector('nav ul');

    const toggle = () => {
        toggleMenu.classList.toggle('active');
        menu.classList.toggle('activeMenu');
    }

    toggleMenu.addEventListener('click', toggle);
});
