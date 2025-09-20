document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card");

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      // <--- El escuchador ahora está en el div 'card'
      // Cierra todas las otras tarjetas primero
      cards.forEach((otherCard) => {
        if (otherCard !== card) {
          otherCard.classList.remove("expanded");
        }
      });

      // Alterna la clase 'expanded' en la tarjeta actual
      card.classList.toggle("expanded");
    });
  });
});
