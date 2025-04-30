import { performLogout } from '../auth/api.js';
import { clearStorageData } from '../auth/storage.js';
import { getCredentials } from '../auth/storage.js';

export function setupLogout() {
    document.getElementById("logoutBtn").addEventListener("click", handleLogout);
    document.getElementById("clearBtn").addEventListener("click", handleClearCredentials);

    async function handleLogout() {
        const { token, savedDomain } = await getCredentials();

        if (!token || !savedDomain) {
            alert("Nenhum token ou domínio salvo. Impossível deslogaar completamente.");
            return;
        }

        const loadingLogout = document.getElementById("loadingLogout");
        const statusMessageLogout = document.getElementById("statusMessageLogout");

        statusMessageLogout.classList.add('hidden');
        loadingLogout.classList.remove('hidden');

        try {
            const success = await performLogout(token, savedDomain);

            if (success) {
                await clearStorageData();
                updateUIAfterLogout();
                alert("Logout realizado com sucesso.");
            } else {
                alert("Erro ao deslogar.");
            }
        } catch (error) {
            console.error("Erro ao fazer logout:", error);
            alert("Erro ao conectar com o servidor.");
        } finally {
            loadingLogout.classList.add('hidden');
        }
    }

    async function handleClearCredentials() {
        await clearStorageData(['token', 'isLoggedIn', 'savedEmail', 'savedPassword', 'savedDomain']);
        updateUIAfterLogout();
        alert("Credenciais removidas.");
    }

    function updateUIAfterLogout() {
        document.getElementById("loginForm").style.display = "block";
        document.getElementById("domainInputSection").style.display = "block";
        document.getElementById("logoutSection").style.display = "none";
    }
}