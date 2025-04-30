import { decrypt } from './crypto.js';
import { validateToken, renewToken, performLogin } from './api.js';
import { getCredentials, setStorageData } from './storage.js';

export async function attemptAutoLoginAndTokenRenewal(domain) {
    const { savedEmail, savedPassword, token } = await getCredentials();
    const decryptedPassword = savedEmail && savedPassword ? await decrypt(savedPassword, savedEmail) : null;

    if (token && savedEmail && domain && !(await validateToken(token, domain))) {
        if (savedEmail && decryptedPassword) {
            const newToken = await renewToken(savedEmail, decryptedPassword, domain);
            if (newToken) {
                await setStorageData({ token: newToken });
                return { success: true, email: savedEmail, reason: 'token-renewed' };
            }
            return { success: false, reason: 'renew-failed' };
        }
        return { success: false, reason: 'no-credentials' };
    }

    if (!token && savedEmail && decryptedPassword && domain) {
        const autoData = await performLogin(savedEmail, decryptedPassword, domain);
        if (autoData?.token) {
            await setStorageData({
                token: autoData.token,
                isLoggedIn: true,
                savedEmail,
                savedDomain: domain
            });
            return { success: true, email: savedEmail, reason: 'auto-login' };
        }
    }

    return { success: false, reason: 'no-auto-login' };
}