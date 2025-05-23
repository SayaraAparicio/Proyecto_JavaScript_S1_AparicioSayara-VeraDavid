document.addEventListener('DOMContentLoaded', function () {
    const pilotosSection = document.querySelector('#pilotos .content-placeholder');
    const formContainer = document.getElementById('form-container');
    const addOption = document.getElementById('add-option'); // Opción "Agregar" en el dropdown
    const API_PILOTOS = "https://682c82284fae18894752cd63.mockapi.io/Pilotos";

    function cargarDatosPilotos() {
        pilotosSection.innerHTML = '<div class="loading">Cargando información de pilotos...</div>';

        fetch(API_PILOTOS)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la respuesta de la API');
                }
                return response.json();
            })
            .then(pilotos => {
                mostrarPilotos(pilotos);
            })
            .catch(error => {
                console.error('Error al cargar los pilotos:', error);
                pilotosSection.innerHTML = `
                    <div class="error-message">
                        <h3>Error al cargar los pilotos</h3>
                        <p>${error.message}</p>
                        <button onclick="cargarDatosPilotos()">Intentar de nuevo</button>
                    </div>
                `;
            });
    }

    function agregarPiloto(data) {
        fetch(API_PILOTOS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al agregar el piloto');
                }
                return response.json();
            })
            .then(() => {
                alert('Piloto agregado correctamente.');
                formContainer.style.display = 'none'; // Ocultar el formulario
                cargarDatosPilotos(); // Recargar los datos
            })
            .catch(error => {
                console.error('Error al agregar el piloto:', error);
                alert('No se pudo agregar el piloto. Inténtalo de nuevo.');
            });
    }

    function eliminarPiloto(id) {
        fetch(`${API_PILOTOS}/${id}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al eliminar el piloto');
                }
                cargarDatosPilotos(); // Recargar los datos después de eliminar
            })
            .catch(error => {
                console.error('Error al eliminar el piloto:', error);
                alert('No se pudo eliminar el piloto. Inténtalo de nuevo.');
            });
    }

    function mostrarFormulario() {
        formContainer.style.display = 'block';
        formContainer.innerHTML = `
            <form id="add-form">
                <label for="nombre">Nombre:</label>
                <input type="text" id="nombre" name="nombre" required>
                
                <label for="equipo">Equipo:</label>
                <input type="text" id="equipo" name="equipo" required>
                
                <label for="rol">Rol:</label>
                <input type="text" id="rol" name="rol" required>
                
                <label for="imagen">URL Imagen:</label>
                <input type="text" id="imagen" name="imagen">
                
                <button type="submit">Guardar</button>
                <button type="button" id="cancel-button">Cancelar</button>
            </form>
        `;

        // Manejar el envío del formulario
        const form = document.getElementById('add-form');
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            agregarPiloto(data);
        });

        // Manejar el botón de cancelar
        const cancelButton = document.getElementById('cancel-button');
        cancelButton.addEventListener('click', function () {
            formContainer.style.display = 'none';
        });
    }

    function mostrarPilotos(pilotos) {
        pilotosSection.innerHTML = ''; // Limpiar la sección antes de agregar nuevos elementos

        pilotos.forEach(piloto => {
            const pilotoCard = document.createElement('div');
            pilotoCard.classList.add('card');

            pilotoCard.innerHTML = `
                <img src="${piloto.imagen}" alt="${piloto.nombre}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 10px;">
                <div class="card__content">
                    <h3 class="card__title">${piloto.nombre}</h3>
                    <p class="card__description"><strong>Equipo:</strong> ${piloto.equipo}</p>
                    <p class="card__description"><strong>Rol:</strong> ${piloto.rol}</p>
                    <button class="delete-button" data-id="${piloto.id}">Eliminar</button>
                </div>
            `;

            pilotosSection.appendChild(pilotoCard);
        });

        // Agregar eventos a los botones de eliminar
        const deleteButtons = document.querySelectorAll('.delete-button');
        deleteButtons.forEach(button => {
            button.addEventListener('click', function () {
                const id = this.getAttribute('data-id');
                if (confirm('¿Estás seguro de que deseas eliminar este piloto?')) {
                    eliminarPiloto(id);
                }
            });
        });
    }

    addOption.addEventListener('click', function (e) {
        e.preventDefault(); // Evitar que el enlace recargue la página
        mostrarFormulario();
    });

    cargarDatosPilotos();
});

document.addEventListener('DOMContentLoaded', function() {
    const profileTrigger = document.querySelector('.profile-trigger');
    const profileCard = document.querySelector('.profile-card');
    const overlay = document.querySelector('.profile-overlay') || document.createElement('div');
    
    if (!document.querySelector('.profile-overlay')) {
      overlay.className = 'profile-overlay';
      document.body.appendChild(overlay);
    }
  
    // Mostrar tarjeta
    profileTrigger.addEventListener('click', function(e) {
      e.stopPropagation();
      profileCard.classList.add('active');
      overlay.classList.add('active');
    });
  
    // Ocultar tarjeta
    function closeProfileCard() {
      profileCard.classList.remove('active');
      overlay.classList.remove('active');
    }
  
    overlay.addEventListener('click', closeProfileCard);
    profileCard.querySelector('.profile-btn').addEventListener('click', closeProfileCard);
  
  
    profileCard.addEventListener('click', function(e) {
      e.stopPropagation();
    });
  });