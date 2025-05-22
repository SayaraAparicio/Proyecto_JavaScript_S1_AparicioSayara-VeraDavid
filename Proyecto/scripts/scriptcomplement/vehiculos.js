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

document.addEventListener('DOMContentLoaded', function () {
    const vehiculosSection = document.querySelector('.informacion .content-placeholder'); // Seleccionar el contenedor correcto
    const searchInput = document.querySelector('.input'); // Seleccionar el campo de búsqueda
    const API_VEHICULOS = "https://682e5aa5746f8ca4a47cbd06.mockapi.io/vehiculos";

    let vehiculosData = []; // Variable para almacenar los datos de la API

    function cargarDatosVehiculos() {
        // Mostrar indicador de carga
        vehiculosSection.innerHTML = '<div class="loading">Cargando información de vehículos...</div>';

        fetch(API_VEHICULOS)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la respuesta de la API');
                }
                return response.json();
            })
            .then(vehiculos => {
                vehiculosData = vehiculos; // Guardar los datos en la variable global
                mostrarVehiculos(vehiculos);
            })
            .catch(error => {
                console.error('Error al cargar los vehículos:', error);
                vehiculosSection.innerHTML = `
                    <div class="error-message">
                        <h3>Error al cargar los vehículos</h3>
                        <p>${error.message}</p>
                        <button onclick="cargarDatosVehiculos()">Intentar de nuevo</button>
                    </div>
                `;
            });
    }

    function mostrarVehiculos(vehiculos) {
        vehiculosSection.innerHTML = ''; // Limpiar la sección antes de agregar nuevos elementos

        vehiculos.forEach(vehiculo => {
            const vehiculoContainer = document.createElement('div');
            vehiculoContainer.classList.add('container');

            vehiculoContainer.innerHTML = `
                <div class="card">
                    <div class="front">
                        <div class="card-top">
                            <p class="card-top-para">${vehiculo.equipo}</p>
                        </div>
                        <img class="carimg" src="${vehiculo.imagen}" alt="${vehiculo.nombre}">
                        <p class="heading">${vehiculo.nombre}</p>
                        <p class="follow"><strong>Motor:</strong> ${vehiculo.motor}</p>
                    </div>
                    <div class="back">
                        <p class="heading">Detalles</p>
                        <p class="follow"><strong>Modelo:</strong> ${vehiculo.modelo}</p>
                        <p class="follow"><strong>Motor:</strong> ${vehiculo.motor}</p>
                    </div>
                </div>
            `;

            vehiculosSection.appendChild(vehiculoContainer);
        });
    }

    function buscarVehiculos(term) {
        const resultados = vehiculosData.filter(vehiculo =>
            vehiculo.nombre.toLowerCase().includes(term.toLowerCase()) ||
            vehiculo.modelo.toLowerCase().includes(term.toLowerCase())
        );
        mostrarVehiculos(resultados);
    }

    // Evento para buscar cuando el usuario escribe en el campo de búsqueda
    searchInput.addEventListener('input', function () {
        const searchTerm = searchInput.value.trim();
        buscarVehiculos(searchTerm);
    });

    // Llamar a la función para cargar los datos al cargar la página
    cargarDatosVehiculos();
});