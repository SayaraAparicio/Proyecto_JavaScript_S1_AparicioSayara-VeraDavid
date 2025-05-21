console.log("Script cargado");
localStorage.setItem('usuario', 'Camper');
localStorage.setItem('contrasena', 'campus2025');

window.addEventListener("DOMContentLoaded", () => {
    const usuario = document.getElementById('user');
    const login = document.getElementById('login');

    if (!usuario || !login) {
        console.error("No se encontró el botón o el contenedor.");
        return;
    }

    usuario.addEventListener('click', () => {
        login.innerHTML = `
            <div class="first">
                <img class="control" src="./img/control (1).png" alt="">
                <h1>LOGIN</h1>
                <div class="login-container">
                    <form id="loginForm">
                        <input id="inputUsuario" type="text" placeholder="Username" required />
                        <input id="inputContrasena" type="password" placeholder="Password" required />
                        <div class="boton">
                            <button class="signin" type="submit"><a href="./pages/inicio.html">SIGN IN<a></button>
                        </div>
                    </form>
                </div>
            </div>
        `;

        const loginForm = document.getElementById('loginForm');

        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const usuarioIngresado = document.getElementById('inputUsuario').value;
            const passwordIngresado = document.getElementById('inputContrasena').value;
            const usuarioGuardado = localStorage.getItem('usuario');
            const passwordGuardado = localStorage.getItem('contrasena');

            if (usuarioIngresado === usuarioGuardado && passwordIngresado === passwordGuardado) {
                login.innerHTML = `
                    <div style="display: flex; justify-content: center; align-items: center;">
                        <a href="../docs/userweb.html" style="display: inline-block; padding: 10px 20px; background-color: green; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">
                            Entrar
                        </a>
                    </div>
                `;
            } else {
                alert('Usuario o contraseña incorrectos. Intenta de nuevo.');
            }
        });
    });
});
