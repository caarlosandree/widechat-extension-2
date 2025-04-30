export async function getStorageData(keys) {
    return await chrome.storage.local.get(keys);
}

export async function setStorageData(items) {
    await chrome.storage.local.set(items);
}

export async function clearStorageData(keys) {
    if (keys) {
        await chrome.storage.local.remove(keys);
    } else {
        await chrome.storage.local.clear();
    }
}

export async function getCredentials() {
    const { savedEmail, savedPassword, token, savedDomain } = await getStorageData([
        'savedEmail', 'savedPassword', 'token', 'savedDomain'
    ]);
    return { savedEmail, savedPassword, token, savedDomain };
}