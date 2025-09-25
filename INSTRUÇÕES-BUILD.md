# 🚀 Instruções para Build e Deploy no cPanel

## 📋 Como Gerar o Build

### Opção 1: Script Automático (Recomendado)

**Para Linux/Mac:**
```bash
chmod +x build-for-cpanel.sh
./build-for-cpanel.sh
```

**Para Windows:**
```cmd
build-for-cpanel.bat
```

### Opção 2: Manual

1. **Instalar dependências:**
   ```bash
   npm install
   ```

2. **Gerar build:**
   ```bash
   npm run build
   ```

3. **Criar arquivo .htaccess** na pasta `dist`:
   ```apache
   Options -MultiViews
   RewriteEngine On
   RewriteCond %{REQUEST_FILENAME} !-f
   RewriteRule ^ index.html [QR,L]
   ```

## 📦 Arquivos Gerados

Após executar o build, você terá:
- 📁 **dist/** - Pasta com todos os arquivos do site
- 📄 **dist/.htaccess** - Configuração para Apache
- 🗜️ **aplus-engenharia-cpanel.zip** (se usar script)

## 🔧 Upload para cPanel HostGator

1. **Acesse o cPanel** da sua conta HostGator
2. **Abra o File Manager**
3. **Navegue até public_html**
4. **Delete todos os arquivos existentes** (exceto .htaccess se houver)
5. **Faça upload** de todos os arquivos da pasta `dist`
6. **Extraia** os arquivos (se enviou em ZIP)

## ✅ Verificação

- ✔️ Acesse seu domínio no navegador
- ✔️ Teste todas as seções do site  
- ✔️ Verifique se as imagens carregam
- ✔️ Teste o menu de navegação

## 🔄 Para Futuras Atualizações

1. Faça suas alterações no código
2. Execute o build novamente
3. Substitua os arquivos no cPanel

---

**⚠️ IMPORTANTE:** Sempre mantenha backup dos arquivos antes de substituir!