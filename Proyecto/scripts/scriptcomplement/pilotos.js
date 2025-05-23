document.addEventListener('DOMContentLoaded', function () {
    const pilotosSection = document.querySelector('#pilotos .content-placeholder'); // Seleccionar el contenedor correcto
    const searchInput = document.querySelector('.input'); // Seleccionar el campo de búsqueda
    const API_PILOTOS = "https://682c82284fae18894752cd63.mockapi.io/Pilotos";

    let pilotosData = []; // Variable para almacenar los datos de la API

    function cargarDatosPilotos() {
        // Mostrar indicador de carga
        pilotosSection.innerHTML = '<div class="loading">Cargando información de pilotos...</div>';

        fetch(API_PILOTOS)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la respuesta de la API');
                }
                return response.json();
            })
            .then(pilotos => {
                pilotosData = pilotos; // Guardar los datos en la variable global
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

    function mostrarPilotos(pilotos) {
        pilotosSection.innerHTML = ''; // Limpiar la sección antes de agregar nuevos elementos

        const row = document.createElement('div');
        row.classList.add('row'); // Contenedor para las filas

        pilotos.forEach((piloto, index) => {
            const pilotoCard = document.createElement('div');
            pilotoCard.classList.add('card');

            pilotoCard.innerHTML = `
                <img src="${piloto.imagen}" alt="${piloto.nombre}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 10px;">
                <div class="card__content">
                    <h3 class="card__title">${piloto.nombre}</h3>
                    <p class="card__description"><strong>Equipo:</strong> ${piloto.equipo}</p>
                    <p class="card__description"><strong>Rol:</strong> ${piloto.rol}</p>
                </div>
            `;

            row.appendChild(pilotoCard);

            // Crear una nueva fila cada 3 cartas
            if ((index + 1) % 3 === 0 || index === pilotos.length - 1) {
                pilotosSection.appendChild(row.cloneNode(true));
                row.innerHTML = ''; // Limpiar la fila para la siguiente iteración
            }
        });
    }

    function buscarPilotos(term) {
        const resultados = pilotosData.filter(piloto =>
            piloto.nombre.toLowerCase().includes(term.toLowerCase()) ||
            piloto.pais.toLowerCase().includes(term.toLowerCase())
        );
        mostrarPilotos(resultados);
    }

    // Evento para buscar cuando el usuario escribe en el campo de búsqueda
    searchInput.addEventListener('input', function () {
        const searchTerm = searchInput.value.trim();
        buscarPilotos(searchTerm);
    });

    // Llamar a la función para cargar los datos al cargar la página
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