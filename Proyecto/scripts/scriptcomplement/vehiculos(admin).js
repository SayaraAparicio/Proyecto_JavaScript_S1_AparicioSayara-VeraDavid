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
    const formContainer = document.getElementById('form-container'); // Contenedor del formulario
    const addOption = document.getElementById('add-option'); // Opción "Agregar" en el dropdown
    const API_VEHICULOS = "https://682e5aa5746f8ca4a47cbd06.mockapi.io/vehiculos";

    function cargarDatosVehiculos() {
        vehiculosSection.innerHTML = '<div class="loading">Cargando información de vehículos...</div>';

        fetch(API_VEHICULOS)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la respuesta de la API');
                }
                return response.json();
            })
            .then(vehiculos => {
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
            // Verificar si las propiedades existen
            const conduccionNormal = vehiculo.conduccion_normal || {};
            const conduccionAgresiva = vehiculo.conduccion_agresiva || {};

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
                        <p class="follow"><strong>Velocidad Máxima:</strong> ${vehiculo.velocidad}</p>
                    </div>
                    <div class="back">
                        <p class="heading">Detalles</p>
                        <p class="follow"><strong>Aceleración:</strong> ${vehiculo.aceleracion}</p>
                        <div class="conduccion-row">
                            <div class="conduccion-col">
                                <p class="follow"><strong>Conducción normal:</strong></p>
                                <ul>
                                    <li class="lista">Velocidad promedio: ${conduccionNormal.velocidad_promedio || 'N/A'}</li>
                                    <li class="lista">Combustible: ${conduccionNormal.combustible_seco || 'N/A'}</li>
                                    <li class="lista">Neumáticos: ${conduccionNormal.neumaticos_seco || 'N/A'}</li>
                                </ul>
                            </div>
                            <div class="conduccion-col">
                                <p class="follow"><strong>Conducción agresiva:</strong></p>
                                <ul>
                                    <li class="lista">Velocidad promedio: ${conduccionAgresiva.velocidad_promedio || 'N/A'}</li>
                                    <li class="lista">Combustible: ${conduccionAgresiva.combustible_seco || 'N/A'}</li>
                                    <li class="lista">Neumáticos: ${conduccionAgresiva.neumaticos_seco || 'N/A'}</li>
                                </ul>
                            </div>
                        </div>
                        <button class="delete-button" data-id="${vehiculo.id}">Eliminar</button>
                    </div>
                </div>
            `;

            vehiculosSection.appendChild(vehiculoContainer);
        });

        // Agregar eventos a los botones de eliminar
        const deleteButtons = document.querySelectorAll('.delete-button');
        deleteButtons.forEach(button => {
            button.addEventListener('click', function () {
                const id = this.getAttribute('data-id');
                if (confirm('¿Estás seguro de que deseas eliminar este vehículo?')) {
                    eliminarVehiculo(id);
                }
            });
        });
    }

    function eliminarVehiculo(id) {
        fetch(`${API_VEHICULOS}/${id}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al eliminar el vehículo');
                }
                alert('Vehículo eliminado correctamente.');
                cargarDatosVehiculos(); // Recargar los datos después de eliminar
            })
            .catch(error => {
                console.error('Error al eliminar el vehículo:', error);
                alert('No se pudo eliminar el vehículo. Inténtalo de nuevo.');
            });
    }

    function mostrarFormulario() {
        formContainer.style.display = 'block';
        formContainer.innerHTML = `
            <form id="add-form">
                <label for="equipo">Equipo:</label>
                <input type="text" id="equipo" name="equipo" required>
                
                <label for="nombre">Nombre:</label>
                <input type="text" id="nombre" name="nombre" required>
                
                <label for="motor">Motor:</label>
                <input type="text" id="motor" name="motor" required>
                
                <label for="velocidad">Velocidad km/h:</label>
                <input type="text" id="velocidad" name="velocidad" required>
                
                <label for="aceleracion">Aceleración:</label>
                <input type="text" id="aceleracion" name="aceleracion" required>
                
                <label for="conduccion_normal_velocidad_promedio">Conducción Normal - Velocidad Promedio:</label>
                <input type="text" id="conduccion_normal_velocidad_promedio" name="conduccion_normal_velocidad_promedio" required>
                
                <label for="conduccion_normal_combustible_seco">Conducción Normal - Combustible Seco:</label>
                <input type="text" id="conduccion_normal_combustible_seco" name="conduccion_normal_combustible_seco" required>
                
                <label for="conduccion_normal_neumaticos_seco">Conducción Normal - Neumáticos Seco:</label>
                <input type="text" id="conduccion_normal_neumaticos_seco" name="conduccion_normal_neumaticos_seco" required>
                
                <label for="conduccion_agresiva_velocidad_promedio">Conducción Agresiva - Velocidad Promedio:</label>
                <input type="text" id="conduccion_agresiva_velocidad_promedio" name="conduccion_agresiva_velocidad_promedio" required>
                
                <label for="conduccion_agresiva_combustible_seco">Conducción Agresiva - Combustible Seco:</label>
                <input type="text" id="conduccion_agresiva_combustible_seco" name="conduccion_agresiva_combustible_seco" required>
                
                <label for="conduccion_agresiva_neumaticos_seco">Conducción Agresiva - Neumáticos Seco:</label>
                <input type="text" id="conduccion_agresiva_neumaticos_seco" name="conduccion_agresiva_neumaticos_seco" required>
                
                <label for="imagen">URL Imagen:</label>
                <input type="url" id="imagen" name="imagen" placeholder="https://example.com/image.jpg">
                <div id="image-preview" style="margin-top: 10px;">
                    <img id="preview-img" src="" alt="Vista previa de la imagen" style="max-width: 100%; height: auto; display: none; border: 1px solid #ddd; border-radius: 5px;">
                </div>
                
                <button type="submit">Guardar</button>
                <button type="button" id="cancel-button">Cancelar</button>
            </form>
        `;

        // Mostrar vista previa de la imagen mientras se escribe la URL
        const imagenInput = document.getElementById('imagen');
        const previewImg = document.getElementById('preview-img');

        imagenInput.addEventListener('input', function () {
            const url = imagenInput.value;
            if (url) {
                previewImg.src = url;
                previewImg.style.display = 'block';
            } else {
                previewImg.src = '';
                previewImg.style.display = 'none';
            }
        });

        // Manejar el envío del formulario
        const form = document.getElementById('add-form');
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            agregarVehiculo(data);
        });

        // Manejar el botón de cancelar
        const cancelButton = document.getElementById('cancel-button');
        cancelButton.addEventListener('click', function () {
            formContainer.style.display = 'none';
        });
    }

    function agregarVehiculo(data) {
        // Estructurar los datos correctamente
        const vehiculo = {
            equipo: data.equipo,
            nombre: data.nombre,
            motor: data.motor,
            velocidad: data.velocidad,
            aceleracion: data.aceleración,
            conduccion_normal: {
                velocidad_promedio: data.conduccion_normal_velocidad_promedio,
                combustible_seco: data.conduccion_normal_combustible_seco,
                neumaticos_seco: data.conduccion_normal_neumaticos_seco,
            },
            conduccion_agresiva: {
                velocidad_promedio: data.conduccion_agresiva_velocidad_promedio,
                combustible_seco: data.conduccion_agresiva_combustible_seco,
                neumaticos_seco: data.conduccion_agresiva_neumaticos_seco,
            },
            imagen: data.imagen,
        };

        fetch(API_VEHICULOS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(vehiculo),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al agregar el vehículo');
                }
                return response.json();
            })
            .then(() => {
                alert('Vehículo agregado correctamente.');
                formContainer.style.display = 'none'; // Ocultar el formulario
                cargarDatosVehiculos(); // Recargar los datos
            })
            .catch(error => {
                console.error('Error al agregar el vehículo:', error);
                alert('No se pudo agregar el vehículo. Inténtalo de nuevo.');
            });
    }

    addOption.addEventListener('click', function (e) {
        e.preventDefault(); // Evitar que el enlace recargue la página
        mostrarFormulario();
    });

    cargarDatosVehiculos();
});