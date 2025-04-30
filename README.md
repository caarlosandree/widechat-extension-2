# 🌐 WideChat Agent Monitor

**WideChat Agent Monitor** é uma extensão para o navegador que monitora abas do WideChat e realiza o logout automático do agente quando a aba ou o navegador é fechado. Ideal para garantir o gerenciamento seguro e eficiente das sessões de atendimento.

---

## ✨ Funcionalidades

- 🔐 **Logout automático** ao fechar a aba ou o navegador.
- 🔓 **Login automático** com credenciais salvas localmente de forma segura.
- 🔁 **Interface simples** para login/logout manual.
- 🧠 **Armazenamento seguro** de credenciais usando criptografia no navegador.

---

## 🚀 Instalação

### Instalar localmente no Chrome (Modo Desenvolvedor)

1. Acesse `chrome://extensions/` no Chrome.
2. Ative o **Modo de Desenvolvedor** (canto superior direito).
3. Clique em **"Carregar sem compactação"**.
4. Selecione a pasta onde estão os arquivos da extensão.

---

## 🌍 Publicação na Chrome Web Store

1. Compacte os arquivos da extensão (`manifest.json`, `background.js`, etc.) em um `.zip`.
2. Acesse o [Developer Dashboard](https://chrome.google.com/webstore/developer/dashboard).
3. Faça upload do `.zip`.
4. Preencha os detalhes da extensão.
5. Publique!

---

## 💡 Como Usar

### 🔐 Login Manual

1. Clique no ícone da extensão na barra do navegador.
2. Insira seu e-mail e senha.
3. A extensão criptografa e salva suas credenciais localmente.

### 🚪 Logout Manual

- Clique no botão de logout na interface da extensão.

### 🧠 Logout Automático

- Ocorre automaticamente quando **todas as abas do WideChat são fechadas** ou o navegador é encerrado.


---

## 🔐 Segurança e Criptografia

- **Algoritmo**: AES-GCM
- **Derivação de chave**: PBKDF2 com SHA-256 + salt
- **Armazenamento**: LocalStorage (com senha criptografada)
- A senha **nunca é salva em texto plano**.

---

## 📫 Contato

Se tiver dúvidas ou sugestões, entre em contato via carlos.sabino@intelbras.com.br.
