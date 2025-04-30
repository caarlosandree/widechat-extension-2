export async function validateToken(token, domain) {
    try {
        const response = await fetch(`https://${domain}/api/v4/auth/me`, {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` }
        });
        return response.status === 200;
    } catch (err) {
        console.error("Erro ao tentar validar o token:", err);
        return false;
    }
}

export async function renewToken(email, password, domain) {
    try {
        const response = await fetch(`https://${domain}/api/v4/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        return data.token || null;
    } catch (err) {
        console.error("Erro ao renovar o token:", err);
        return null;
    }
}

export async function performLogin(email, password, domain) {
    try {
        const response = await fetch(`https://${domain}/api/v4/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });
        return await response.json();
    } catch (error) {
        console.error("Erro ao fazer login:", error);
        return null;
    }
}

export async function performLogout(token, domain) {
    try {
        const response = await fetch(`https://${domain}/api/v4/auth/logout?type=all`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.ok;
    } catch (error) {
        console.error("Erro ao fazer logout:", error);
        return false;
    }
}