import { attemptAutoLoginAndTokenRenewal } from './auth/auth.js';
import { setupLoginForm } from './ui/login.js';
import { setupLogout } from './ui/logout.js';
import { setupCardAnimations } from './ui/animations.js';
import { getStorageData } from './auth/storage.js';

document.addEventListener("DOMContentLoaded", async () => {
    // Configura animações
    setupCardAnimations();

    // Configura handlers de UI
    setupLoginForm();
    setupLogout();

    // Verifica estado inicial
    const { isLoggedIn, savedEmail, savedDomain } = await getStorageData(['isLoggedIn', 'savedEmail', 'savedDomain']);

    if (isLoggedIn && savedEmail && savedDomain) {
        document.getElementById("userEmail").textContent = savedEmail;
        document.getElementById("loginForm").style.display = "none";
        document.getElementById("domainInputSection").style.display = "none";
        document.getElementById("logoutSection").style.display = "block";
    } else {
        document.getElementById("loginForm").style.display = "block";
        document.getElementById("domainInputSection").style.display = "block";
        document.getElementById("logoutSection").style.display = "none";

        if (savedDomain) {
            document.getElementById("domain").value = savedDomain;
        }

        await attemptAutoLoginAndTokenRenewal(savedDomain);
    }
});