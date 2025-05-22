document.addEventListener('DOMContentLoaded', function () {
    const equiposSection = document.getElementById('equipos');

    function cargarDatosEquipos() {
        const API_EQUIPOS = "https://682c82284fae18894752cd63.mockapi.io/escuderia";

        // Mostrar indicador de carga
        equiposSection.innerHTML = '<div class="loading">Cargando información de equipos...</div>';

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
                equiposSection.innerHTML = `
                    <div class="error-message">
                        <h3>Error al cargar los equipos</h3>
                        <p>${error.message}</p>
                        <button onclick="cargarDatosEquipos()">Intentar de nuevo</button>
                    </div>
                `;
            });
    }

    function mostrarEquipos(equipos) {
        equiposSection.innerHTML = ''; // Limpiar la sección antes de agregar nuevos elementos

        const row = document.createElement('div');
        row.classList.add('row'); // Contenedor para las filas

        equipos.forEach((equipo, index) => {
            const equipoCard = document.createElement('div');
            equipoCard.classList.add('card');

            equipoCard.innerHTML = `
                <img src="${equipo.imagen}" alt="${equipo.nombre}">
                <div class="card__content">
                    <h3 class="card__title">${equipo.nombre}</h3>
                    <p class="card__description"><strong>País:</strong> ${equipo.pais}</p>
                    <p class="card__description"><strong>Motor:</strong> ${equipo.motor}</p>
                </div>
            `;

            row.appendChild(equipoCard);

            // Crear una nueva fila cada 3 cartas
            if ((index + 1) % 3 === 0 || index === equipos.length - 1) {
                equiposSection.appendChild(row.cloneNode(true));
                row.innerHTML = ''; // Limpiar la fila para la siguiente iteración
            }
        });
    }

    // Llamar a la función para cargar los datos al cargar la página
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