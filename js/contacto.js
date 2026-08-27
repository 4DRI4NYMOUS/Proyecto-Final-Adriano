const emailJsConfig = {
    publicKey: "I02hEPDEmCdAZqzX3",
    serviceId: "service_gmgfwba",
    templateId: "template_6ac5iir"
};

const formulario = document.getElementById("form-contacto");
const estadoFormulario = document.getElementById("estado-formulario");
const botonEnviar = document.getElementById("btn-enviar");

const mostrarEstado = (mensaje, tipo) => {
    if (!estadoFormulario) return;

    estadoFormulario.textContent = mensaje;
    estadoFormulario.dataset.tipo = tipo;
};

const configuracionCompleta = Object.values(emailJsConfig)
    .every((valor) => valor && !valor.startsWith("TU_"));

if (formulario && botonEnviar) {
    formulario.addEventListener("submit", async (evento) => {
        evento.preventDefault();

        if (!formulario.checkValidity()) {
            formulario.reportValidity();
            return;
        }

        if (!configuracionCompleta) {
            mostrarEstado("Completa publicKey, serviceId y templateId en contacto.js.", "error");
            return;
        }

        botonEnviar.disabled = true;
        mostrarEstado("Enviando mensaje...", "cargando");

        try {
            const datos = new FormData(formulario);
            const nombre = datos.get("nombre");
            const email = datos.get("email");
            const telefono = datos.get("telefono");
            const asunto = datos.get("asunto");
            const medio = datos.get("medio");
            const mensaje = datos.get("mensaje");
            const novedades = datos.get("check1") ? "Si" : "No";
            const mensajeCompleto = `Nombre: ${nombre}\nEmail: ${email}\nTelefono: ${telefono}\nAsunto: ${asunto}\nMedio para contactar: ${medio}\nNovedades: ${novedades}\n\nMensaje:\n${mensaje}`;

            await emailjs.send(
                emailJsConfig.serviceId,
                emailJsConfig.templateId,
                {
                    nombre,
                    name: nombre,
                    email,
                    correo: email,
                    telefono,
                    phone: telefono,
                    asunto,
                    subject: asunto,
                    medio,
                    contact_method: medio,
                    mensaje: mensajeCompleto,
                    message: mensajeCompleto,
                    novedades,
                    reply_to: email
                }
            );

            formulario.reset();
            mostrarEstado("Mensaje enviado correctamente.", "exito");
        } catch (error) {
            console.error("Error al enviar el formulario:", error);
            mostrarEstado("No se pudo enviar el mensaje. Revisa la configuracion de EmailJS.", "error");
        } finally {
            botonEnviar.disabled = false;
        }
    });
}

if (configuracionCompleta) {
    emailjs.init({ publicKey: emailJsConfig.publicKey });
}
