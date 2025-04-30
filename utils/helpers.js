/**
 * Funções auxiliares genéricas para o aplicativo
 */

/**
 * Converte um ArrayBuffer para string Base64
 * @param {ArrayBuffer} buffer
 * @returns {string} String Base64
 */
export function arrayBufferToBase64(buffer) {
    return btoa(String.fromCharCode(...new Uint8Array(buffer)));
}

/**
 * Converte uma string Base64 para ArrayBuffer
 * @param {string} base64
 * @returns {ArrayBuffer} ArrayBuffer
 */
export function base64ToArrayBuffer(base64) {
    return Uint8Array.from(atob(base64), c => c.charCodeAt(0));
}

/**
 * Gera um IV (Initialization Vector) aleatório para criptografia
 * @param {number} length - Tamanho do IV (padrão 12 para AES-GCM)
 * @returns {Uint8Array} IV
 */
export function generateRandomIV(length = 12) {
    return crypto.getRandomValues(new Uint8Array(length));
}

/**
 * Mostra/oculta um elemento de loading
 * @param {string} elementId - ID do elemento
 * @param {boolean} show - Se deve mostrar ou ocultar
 */
export function toggleLoading(elementId, show) {
    const element = document.getElementById(elementId);
    if (!element) return;

    if (show) {
        element.classList.remove('hidden');
    } else {
        element.classList.add('hidden');
    }
}

/**
 * Mostra uma mensagem de status temporária
 * @param {string} elementId - ID do elemento de mensagem
 * @param {string} message - Mensagem a ser exibida
 * @param {number} [timeout=3000] - Tempo em ms até desaparecer
 */
export function showTempStatus(elementId, message, timeout = 3000) {
    const element = document.getElementById(elementId);
    if (!element) return;

    element.textContent = message;
    element.classList.remove('hidden');

    setTimeout(() => {
        element.classList.add('hidden');
    }, timeout);
}

/**
 * Valida se um email tem formato válido
 * @param {string} email
 * @returns {boolean}
 */
export function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

/**
 * Valida se um domínio tem formato válido
 * @param {string} domain
 * @returns {boolean}
 */
export function isValidDomain(domain) {
    const re = /^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i;
    return re.test(domain);
}

/**
 * Formata dados do usuário para exibição
 * @param {string} email
 * @returns {string} Email formatado
 */
export function formatUserEmail(email) {
    if (!email) return 'Usuário não identificado';
    return email.length > 20 ? `${email.substring(0, 15)}...` : email;
}

/**
 * Função de debounce para limitar chamadas frequentes
 * @param {Function} func - Função a ser chamada
 * @param {number} wait - Tempo de espera em ms
 * @returns {Function} Função com debounce aplicado
 */
export function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Verifica se estamos rodando no contexto de extensão Chrome
 * @returns {boolean}
 */
export function isChromeExtension() {
    return !!window.chrome && !!chrome.runtime && !!chrome.runtime.id;
}

/**
 * Copia texto para a área de transferência
 * @param {string} text - Texto a ser copiado
 * @returns {Promise<boolean>} Se a cópia foi bem-sucedida
 */
export async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (err) {
        console.error('Falha ao copiar texto:', err);
        return false;
    }
}