document.addEventListener('DOMContentLoaded', function () {
    const circuitosSection = document.querySelector('.informacion .content-placeholder'); // Contenedor para las tarjetas
    const searchInput = document.querySelector('.input'); // Campo de búsqueda
    const API_CIRCUITOS = "https://682e5aa5746f8ca4a47cbd06.mockapi.io/circuitos";

    let circuitosData = []; // Variable para almacenar los datos de la API

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
                circuitosData = circuitos; // Guardar los datos en la variable global
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
    }

    function buscarCircuitos(term) {
        const resultados = circuitosData.filter(circuito =>
            circuito.nombre.toLowerCase().includes(term.toLowerCase()) ||
            circuito.ubicacion.toLowerCase().includes(term.toLowerCase())
        );
        mostrarCircuitos(resultados);
    }

    // Evento para buscar cuando el usuario escribe en el campo de búsqueda
    searchInput.addEventListener('input', function () {
        const searchTerm = searchInput.value.trim();
        buscarCircuitos(searchTerm);
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