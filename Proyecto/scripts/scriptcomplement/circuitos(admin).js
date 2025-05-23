document.addEventListener('DOMContentLoaded', function () {
    const circuitosSection = document.querySelector('.informacion .content-placeholder'); // Contenedor para las tarjetas
    const formContainer = document.getElementById('form-container'); // Contenedor del formulario
    const addOption = document.getElementById('add-option'); // Opción "Agregar" en el dropdown
    const API_CIRCUITOS = "https://682e5aa5746f8ca4a47cbd06.mockapi.io/circuitos";

    function cargarDatosCircuitos() {
        // Mostrar indicador de carga
        circuitosSection.innerHTML = '<div class="loading">Cargando información de circuitos...</div>';

        fetch(API_CIRCUITOS)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la respuesta de la API');
                }
                return response.json();
            })
            .then(circuitos => {
                mostrarCircuitos(circuitos);
            })
            .catch(error => {
                console.error('Error al cargar los circuitos:', error);
                circuitosSection.innerHTML = `
                    <div class="error-message">
                        <h3>Error al cargar los circuitos</h3>
                        <p>${error.message}</p>
                        <button onclick="cargarDatosCircuitos()">Intentar de nuevo</button>
                    </div>
                `;
            });
    }

    function mostrarCircuitos(circuitos) {
        circuitosSection.innerHTML = ''; // Limpiar la sección antes de agregar nuevos elementos

        circuitos.forEach(circuito => {
            const circuitoCard = document.createElement('div');
            circuitoCard.classList.add('card');

            // Verificar si "temporadas" existe y es un array
            const temporadas = Array.isArray(circuito.temporadas) ? circuito.temporadas : [];

            circuitoCard.innerHTML = `
                <img class="circuit" src="${circuito.imagen}" alt="${circuito.nombre}">
                <div class="header">${circuito.nombre}</div>
                <button class="App-button toggle-button">Mostrar detalles</button>
                <div class="extra-info" style="display: none; margin-top: 20px; font-weight: normal; font-size: 18px; color: #333;">
                    <p><strong>Ganadores:</strong> ${circuito.ganadores}</p>
                    <p><strong>Longitud:</strong> ${circuito.longitud} km</p>
                    <p><strong>Descripción:</strong> ${circuito.descripcion}</p>
                    <p><strong>Record:</strong> ${circuito.record}</p>
                    <p><strong>Clima promedio:</strong> ${circuito.clima_promedio}</p>
                    <p><strong>Desgaste de neumáticos:</strong> ${circuito.desgaste_neumaticos}</p>
                    <p><strong>Consumo de combustible:</strong> ${circuito.consumo_combustible}</p>
                    <p><strong>Temporadas:</strong></p>
                    <ul>
                        ${temporadas.length > 0 ? temporadas.map(temp => `
        <li>${temp.temporada} - ${temp.piloto}</li>
    `).join('') : '<li>No hay temporadas disponibles</li>'}
                    </ul>
                </div>
                <button class="delete-button" data-id="${circuito.id}">Eliminar</button>
            `;

            circuitosSection.appendChild(circuitoCard);

            // Agregar funcionalidad de mostrar/ocultar detalles
            const toggleButton = circuitoCard.querySelector('.toggle-button');
            const extraInfo = circuitoCard.querySelector('.extra-info');

            toggleButton.addEventListener('click', () => {
                if (extraInfo.style.display === 'none') {
                    extraInfo.style.display = 'block';
                    toggleButton.textContent = 'Ocultar detalles';
                } else {
                    extraInfo.style.display = 'none';
                    toggleButton.textContent = 'Mostrar detalles';
                }
            });
        });

        // Agregar eventos a los botones de eliminar
        const deleteButtons = document.querySelectorAll('.delete-button');
        deleteButtons.forEach(button => {
            button.addEventListener('click', function () {
                const id = this.getAttribute('data-id');
                if (confirm('¿Estás seguro de que deseas eliminar este circuito?')) {
                    eliminarCircuito(id);
                }
            });
        });
    }

    function eliminarCircuito(id) {
        fetch(`${API_CIRCUITOS}/${id}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al eliminar el circuito');
                }
                alert('Circuito eliminado correctamente.');
                cargarDatosCircuitos(); // Recargar los datos después de eliminar
            })
            .catch(error => {
                console.error('Error al eliminar el circuito:', error);
                alert('No se pudo eliminar el circuito. Inténtalo de nuevo.');
            });
    }

    function mostrarFormulario() {
        formContainer.style.display = 'block';
        formContainer.innerHTML = `
            <form id="add-form">
                <label for="nombre">Nombre:</label>
                <input type="text" id="nombre" name="nombre" required>
                
                <label for="imagen">URL Imagen:</label>
                <input type="url" id="imagen" name="imagen" placeholder="https://example.com/image.jpg" required>
                
                <label for="longitud">Longitud (km):</label>
                <input type="number" id="longitud" name="longitud" required>
                
                <label for="descripcion">Descripción:</label>
                <textarea id="descripcion" name="descripcion" rows="3" required></textarea>
                
                <label for="record">Record:</label>
                <input type="text" id="record" name="record" required>
                
                <label for="clima_promedio">Clima promedio:</label>
                <input type="text" id="clima_promedio" name="clima_promedio" required>
                
                <label for="desgaste_neumaticos">Desgaste de neumáticos:</label>
                <input type="text" id="desgaste_neumaticos" name="desgaste_neumaticos" required>
                
                <label for="consumo_combustible">Consumo de combustible:</label>
                <input type="text" id="consumo_combustible" name="consumo_combustible" required>
                
                <label for="ganadores">Ganadores:</label>
                <input type="text" id="ganadores" name="ganadores" required>
                
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
            agregarCircuito(data);
        });

        // Manejar el botón de cancelar
        const cancelButton = document.getElementById('cancel-button');
        cancelButton.addEventListener('click', function () {
            formContainer.style.display = 'none';
        });
    }

    function agregarCircuito(data) {
        fetch(API_CIRCUITOS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al agregar el circuito');
                }
                return response.json();
            })
            .then(() => {
                alert('Circuito agregado correctamente.');
                formContainer.style.display = 'none'; // Ocultar el formulario
                cargarDatosCircuitos(); // Recargar los datos
            })
            .catch(error => {
                console.error('Error al agregar el circuito:', error);
                alert('No se pudo agregar el circuito. Inténtalo de nuevo.');
            });
    }

    // Evento para la opción "Agregar" en el dropdown
    addOption.addEventListener('click', function (e) {
        e.preventDefault(); // Evitar que el enlace recargue la página
        mostrarFormulario();
    });

    // Llamar a la función para cargar los datos al cargar la página
    cargarDatosCircuitos();
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