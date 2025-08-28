// Obtém os elementos HTML usando seus IDs
const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const questionContainer = document.querySelector('.question-container');
const heartLoader = document.getElementById('heartLoader');
const resultContainer = document.getElementById('resultContainer');

// Adiciona um "ouvinte de evento" (event listener) para quando o mouse passar sobre o botão "Não"
noBtn.addEventListener('mouseover', () => {
    // Calcula uma nova posição aleatória para o botão "Não"
    const newX = Math.floor(Math.random() * (questionContainer.offsetWidth - noBtn.offsetWidth));
    const newY = Math.floor(Math.random() * (questionContainer.offsetHeight - noBtn.offsetHeight));

    // Define a nova posição do botão
    noBtn.style.position = 'absolute'; // Garante que a posição 'top' e 'left' funcionem
    noBtn.style.left = `${newX}px`;
    noBtn.style.top = `${newY}px`;
});

// Adiciona um "ouvinte de evento" para quando o botão "Sim" for clicado
yesBtn.addEventListener('click', () => {
    // Oculta o "loader" (se existir) e exibe o "resultado" após um pequeno atraso
    setTimeout(() => {
        if (heartLoader) {
            heartLoader.style.display = 'none';
        }
        resultContainer.style.display = 'block';
    }, 500); // O atraso de 500ms é o que aparece na imagem
});