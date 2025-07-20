document.addEventListener('DOMContentLoaded', () => {

  // 1) Troca de tema
  document.getElementById('theme-switch').addEventListener('change', e => {
    document.body.className = e.target.value;
  });

  // 2) Sugestões com fade
  const sugestoes = [
    { id: '1fX4lpIU87UOIaPTwMAfKVSdfl1UE1G-t', titulo: 'Barbie: Moda & Magia',       texto: '“Acredite em si mesma e tudo será possível.”' },
    { id: '1KDSMCM9RQlUsuCY_KnjeDTbwCUUOkRnx', titulo: 'Barbie: Quebra-Nozes',         texto: '“Coragem faz magia acontecer.”' },
    { id: '1Y57SJin7GnQRml9ny5Zj2YAQH5Ct7dre', titulo: 'Barbie: Segredo das Casas',     texto: '“Descubra mundos que você nunca imaginou.”' },
    { id: '1NGaJ5T5sbmLqM7MJVic5LMED7JdGKlBq', titulo: 'Barbie: Escola de Princesas',   texto: '“Existe uma princesa em cada garota.”' },
    { id: '1UKabZAmK4VdwSfTLC0knEdn_zf2g-zJl', titulo: 'Barbie: Natal Perfeito',         texto: '“O amor é o melhor presente.”' }
  ];
  let idx = 0;
  const titleEl  = document.getElementById('hero-title');
  const textEl   = document.getElementById('hero-text');
  const heroPlay = document.getElementById('hero-play');

  function changeSuggestion() {
    titleEl.classList.add('fade-out');
    textEl.classList.add('fade-out');
    setTimeout(() => {
      idx = (idx + 1) % sugestoes.length;
      const s = sugestoes[idx];
      titleEl.textContent = '🌟 ' + s.titulo;
      textEl.textContent  = s.texto;
      titleEl.classList.remove('fade-out');
      textEl.classList.remove('fade-out');
    }, 600);
  }
  setInterval(changeSuggestion, 5000);

  // 3) Modal / player
  const modal      = document.getElementById('modal');
  const player     = document.getElementById('player');
  const modalClose = document.getElementById('modal-close');

  function openPlayer(id) {
  player.src = `https://drive.google.com/file/d/${id}/preview`;
  modal.style.display = 'flex';

  // dispara fullscreen
  const mc = document.getElementById('modal-content');
  if (mc.requestFullscreen) {
    mc.requestFullscreen();
  }
}

  modalClose.addEventListener('click', () => {
    modal.style.display = 'none';
    player.src = '';
  });
  modal.addEventListener('click', e => {
    if (e.target === modal) modalClose.click();
  });

  // 4) Hero “Assistir Agora”
  heroPlay.addEventListener('click', e => {
    e.preventDefault();
    openPlayer(sugestoes[idx].id);
  });

  // 5) Cards do carrossel
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
      openPlayer(card.dataset.id);
    });
  });

  // 6) Setas de navegação do carrossel
  document.querySelectorAll('.carousel-container').forEach(c => {
    const carousel = c.querySelector('.carousel');
    c.querySelector('.left') .addEventListener('click', () => carousel.scrollBy({ left: -200, behavior: 'smooth' }));
    c.querySelector('.right').addEventListener('click', () => carousel.scrollBy({ left:  200, behavior: 'smooth' }));
  });

});
