import { performLogin } from '../auth/api.js';
import { encrypt, decrypt } from '../auth/crypto.js';
import { setStorageData } from '../auth/storage.js';

export function setupLoginForm() {
    const loginForm = document.getElementById("loginForm");
    const passwordInput = document.getElementById("password");
    const togglePassword = document.getElementById("togglePassword");

    // Mostrar/ocultar senha
    togglePassword.addEventListener('click', () => {
        const type = passwordInput.type === 'password' ? 'text' : 'password';
        passwordInput.type = type;
        togglePassword.textContent = type === 'password' ? '👁️' : '🙈';
    });

    // Login por clique
    document.getElementById("loginBtn").addEventListener("click", handleLogin);

    // Login por Enter
    passwordInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            handleLogin();
        }
    });

    async function handleLogin() {
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const domain = document.getElementById("domain").value.trim();
        const loading = document.getElementById('loadingLogin');
        const statusMessage = document.getElementById('statusMessage');

        statusMessage.classList.add('hidden');
        loading.classList.remove('hidden');

        if (!email || !password || !domain) {
            alert("Preencha todos os campos, incluindo o domínio.");
            loading.classList.add('hidden');
            return;
        }

        try {
            const data = await performLogin(email, password, domain);

            if (data?.token) {
                const encryptedPassword = await encrypt(password, email);
                await setStorageData({
                    token: data.token,
                    isLoggedIn: true,
                    savedEmail: email,
                    savedPassword: encryptedPassword,
                    savedDomain: domain
                });

                updateUIAfterLogin(email);
                alert("Login realizado com sucesso.");
            } else {
                showLoginError(statusMessage);
            }
        } catch (error) {
            showLoginError(statusMessage);
        } finally {
            loading.classList.add('hidden');
        }
    }

    function updateUIAfterLogin(email) {
        document.getElementById("userEmail").textContent = email;
        document.getElementById("loginForm").style.display = "none";
        document.getElementById("domainInputSection").style.display = "none";
        document.getElementById("logoutSection").style.display = "block";
    }

    function showLoginError(element) {
        element.classList.remove('hidden');
        element.textContent = "Erro no login. Verifique suas credenciais e o domínio.";
        alert("Erro no login. Verifique suas credenciais e o domínio.");
    }
}