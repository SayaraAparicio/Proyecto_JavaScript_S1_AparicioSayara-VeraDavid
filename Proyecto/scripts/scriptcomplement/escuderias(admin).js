document.addEventListener('DOMContentLoaded', function () {
    const equiposSection = document.getElementById('equipos');
    const formContainer = document.getElementById('form-container');
    const addOption = document.getElementById('add-option'); // Opción "Agregar" en el dropdown
    const API_EQUIPOS = "https://682c82284fae18894752cd63.mockapi.io/escuderia";

    function cargarDatosEquipos() {
        equiposSection.querySelector('.content-placeholder').innerHTML = '<div class="loading">Cargando información de equipos...</div>';

        fetch(API_EQUIPOS)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la respuesta de la API');
                }
                return response.json();
            })
            .then(equipos => {
                mostrarEquipos(equipos);
            })
            .catch(error => {
                console.error('Error al cargar los equipos:', error);
                equiposSection.querySelector('.content-placeholder').innerHTML = `
                    <div class="error-message">
                        <h3>Error al cargar los equipos</h3>
                        <p>${error.message}</p>
                        <button onclick="cargarDatosEquipos()">Intentar de nuevo</button>
                    </div>
                `;
            });
    }

    function agregarEquipo(data) {
        fetch(API_EQUIPOS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al agregar el equipo');
                }
                return response.json();
            })
            .then(() => {
                alert('Equipo agregado correctamente.');
                formContainer.style.display = 'none'; // Ocultar el formulario
                cargarDatosEquipos(); // Recargar los datos
            })
            .catch(error => {
                console.error('Error al agregar el equipo:', error);
                alert('No se pudo agregar el equipo. Inténtalo de nuevo.');
            });
    }

    function mostrarFormulario() {
        formContainer.style.display = 'block';
        formContainer.innerHTML = `
            <form id="add-form">
                <label for="nombre">Nombre:</label>
                <input type="text" id="nombre" name="nombre" required>
                
                <label for="pais">País:</label>
                <input type="text" id="pais" name="pais" required>
                
                <label for="motor">Motor:</label>
                <input type="text" id="motor" name="motor">
                
                <label for="pilotos">Pilotos:</label>
                <input type="text" id="pilotos" name="pilotos">
                
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
            agregarEquipo(data);
        });

        // Manejar el botón de cancelar
        const cancelButton = document.getElementById('cancel-button');
        cancelButton.addEventListener('click', function () {
            formContainer.style.display = 'none';
        });
    }

    function eliminarEquipo(id) {
        fetch(`${API_EQUIPOS}/${id}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al eliminar el equipo');
                }
                // Recargar los datos después de eliminar
                cargarDatosEquipos();
            })
            .catch(error => {
                console.error('Error al eliminar el equipo:', error);
                alert('No se pudo eliminar el equipo. Inténtalo de nuevo.');
            });
    }

    function mostrarEquipos(equipos) {
        const contentPlaceholder = equiposSection.querySelector('.content-placeholder');
        contentPlaceholder.innerHTML = ''; // Limpiar la sección antes de agregar nuevos elementos

        equipos.forEach(equipo => {
            const equipoCard = document.createElement('div');
            equipoCard.classList.add('card');

            equipoCard.innerHTML = `
                <img src="${equipo.imagen}" alt="${equipo.nombre}">
                <div class="card__content">
                    <h3 class="card__title">${equipo.nombre}</h3>
                    <p class="card__description"><strong>País:</strong> ${equipo.pais}</p>
                    <p class="card__description"><strong>Motor:</strong> ${equipo.motor}</p>
                    <button class="delete-button" data-id="${equipo.id}">Eliminar</button>
                </div>
            `;

            contentPlaceholder.appendChild(equipoCard);
        });

        // Agregar eventos a los botones de eliminar
        const deleteButtons = document.querySelectorAll('.delete-button');
        deleteButtons.forEach(button => {
            button.addEventListener('click', function () {
                const id = this.getAttribute('data-id');
                if (confirm('¿Estás seguro de que deseas eliminar este equipo?')) {
                    eliminarEquipo(id);
                }
            });
        });
    }

    addOption.addEventListener('click', function (e) {
        e.preventDefault(); // Evitar que el enlace recargue la página
        mostrarFormulario();
    });

    cargarDatosEquipos();
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