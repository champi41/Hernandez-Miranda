document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card");

  if (cards.length > 0) {
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
  }

  // --- Integración de Formulario con Brevo ---
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      // Recolectar datos
      const name = document.getElementById("form-name").value;
      const email = document.getElementById("form-email").value;
      const area = document.getElementById("form-area").value;
      const message = document.getElementById("form-message").value;
      const submitBtn = document.getElementById("form-submit");

      // Validar (opcional en JS, ya tiene 'required' en HTML)
      if (!name || !email || !area || !message) return;

      const originalBtnText = submitBtn.innerText;
      submitBtn.innerText = "Enviando...";
      submitBtn.disabled = true;

      // ⚠️ ADVERTENCIA:
      // Esta API Key está expuesta del lado del cliente.
      // Se recomienda usar un backend (Node.js, PHP, etc.) o Netlify/Vercel functions en producción.
      const API_KEY =
        "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"; // Reemplaza esto con tu API Key de Brevo

      const url = "https://api.brevo.com/v3/smtp/email";
      const payload = {
        // En Brevo, el 'sender' siempre debe ser tu correo verificado
        sender: {
          name: "Sitio Web (Contacto)",
          email: "contacto@noreply.hernandezymiranda.com",
        },
        // 'replyTo' hace que al presionar "Responder" en Gmail, se envíe la respuesta al cliente
        replyTo: { name: name, email: email },
        to: [{ email: "cr.mirandacastro@gmail.com", name: "Cristian Miranda" }],
        subject: `Nueva consulta (${area}) de: ${name}`,
        htmlContent: `
          <h3>Nueva consulta desde sitio web</h3>
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Correo:</strong> ${email}</p>
          <p><strong>Área:</strong> ${area}</p>
          <p><strong>Mensaje:</strong></p>
          <p>${message.replace(/\n/g, "<br>")}</p>
        `,
      };

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            accept: "application/json",
            "api-key": API_KEY,
            "content-type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          alert("¡Mensaje enviado con éxito! Me contactaré a la brevedad.");
          contactForm.reset();
        } else {
          const errorData = await response.json();
          console.error("Error de Brevo:", errorData);
          alert(
            "Hubo un problema enviando el mensaje. Por favor, intente de nuevo.",
          );
        }
      } catch (error) {
        console.error("Error en petición:", error);
        alert("Error de conexión. Intente comunicarse vía WhatsApp.");
      } finally {
        submitBtn.innerText = originalBtnText;
        submitBtn.disabled = false;
      }
    });
  }
});
