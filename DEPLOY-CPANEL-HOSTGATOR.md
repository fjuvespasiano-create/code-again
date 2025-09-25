# 🚀 Deploy no cPanel HostGator - A+ Engenharia

## 📋 Pré-requisitos
- Conta HostGator com cPanel
- Node.js instalado no seu computador local
- Acesso aos arquivos do projeto

## 🔧 Passo 1: Preparar o Build Local

### 1.1 Instalar Dependências
```bash
npm install
```

### 1.2 Gerar Build de Produção
```bash
npm run build
```
Este comando criará uma pasta `dist` com todos os arquivos otimizados para produção.

## 📂 Passo 2: Upload para cPanel

### 2.1 Acessar cPanel
1. Faça login no cPanel da HostGator
2. Vá em **Gerenciador de Arquivos** (File Manager)
3. Navegue até a pasta `public_html` (ou subdomínio desejado)

### 2.2 Limpar Pasta de Destino
1. Delete todos os arquivos existentes na pasta de destino
2. **IMPORTANTE**: Mantenha apenas arquivos como `.htaccess` se existirem

### 2.3 Upload dos Arquivos
1. Selecione todos os arquivos da pasta `dist` gerada
2. Faça upload via **File Manager** ou **FTP**
3. Extraia os arquivos diretamente na pasta `public_html`

### 2.4 Configurar .htaccess (Importante para React Router)
Crie/edite o arquivo `.htaccess` na raiz com o seguinte conteúdo:

```apache
Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.html [QR,L]

# Cache para melhor performance
<IfModule mod_expires.c>
ExpiresActive on
ExpiresByType text/css "access plus 1 year"
ExpiresByType application/javascript "access plus 1 year"
ExpiresByType image/png "access plus 1 year"
ExpiresByType image/jpg "access plus 1 year"
ExpiresByType image/jpeg "access plus 1 year"
</IfModule>

# Compressão GZIP
<IfModule mod_deflate.c>
AddOutputFilterByType DEFLATE text/plain
AddOutputFilterByType DEFLATE text/html
AddOutputFilterByType DEFLATE text/xml
AddOutputFilterByType DEFLATE text/css
AddOutputFilterByType DEFLATE application/xml
AddOutputFilterByType DEFLATE application/xhtml+xml
AddOutputFilterByType DEFLATE application/rss+xml
AddOutputFilterByType DEFLATE application/javascript
AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>
```

## 🎯 Passo 3: Verificar Deploy
1. Acesse seu domínio no navegador
2. Teste todas as seções do site
3. Verifique se as imagens carregam corretamente
4. Teste o formulário de contato

## ✏️ Como Alterar Textos e Imagens Após Deploy

### Para Alterar TEXTOS:

#### Opção 1: Edição Direta (Mais Rápida)
1. Acesse cPanel → **Gerenciador de Arquivos**
2. Navegue até `public_html/assets/` 
3. Encontre arquivos `.js` que contêm os textos
4. **ATENÇÃO**: Os textos estão minificados. Use Ctrl+F para buscar parte do texto
5. Edite com cuidado para não quebrar o código

#### Opção 2: Re-deploy Completo (Recomendado)
1. Edite os arquivos fonte no seu computador
2. Execute `npm run build` novamente
3. Faça novo upload da pasta `dist`

### Para Alterar IMAGENS:

#### Método Simples:
1. Acesse cPanel → **Gerenciador de Arquivos**
2. Vá até `public_html/assets/`
3. Substitua as imagens mantendo **exatamente o mesmo nome**
4. **IMPORTANTE**: Use o mesmo formato (JPG, PNG, etc.)

#### Adicionar Novas Imagens:
1. Adicione no projeto local em `src/assets/`
2. Atualize o código para usar a nova imagem
3. Execute `npm run build`
4. Faça upload completo novamente

## 🔄 Workflow para Atualizações Futuras

### Para Pequenas Alterações:
1. ✏️ Edite textos diretamente no cPanel
2. 🖼️ Substitua imagens mantendo os nomes

### Para Grandes Alterações:
1. 💻 Edite localmente no projeto
2. 🔨 Execute `npm run build`
3. 📤 Faça upload da nova pasta `dist`

## 📱 Arquivos Importantes no cPanel

```
public_html/
├── index.html          # Página principal
├── assets/
│   ├── *.js           # Lógica do site (textos aqui)
│   ├── *.css          # Estilos
│   └── *.jpg/png      # Imagens
└── .htaccess          # Configurações do servidor
```

## 🆘 Troubleshooting

### Site não carrega:
- Verifique se o arquivo `index.html` está na raiz
- Confirme se o `.htaccess` está configurado corretamente

### Imagens não aparecem:
- Verifique os nomes dos arquivos (case-sensitive)
- Confirme se estão na pasta `assets`

### Formulário não funciona:
- Configure um script PHP de contato no cPanel
- Ou use serviços como Formspree, Netlify Forms

## 📞 Suporte
Para dúvidas específicas sobre o cPanel, contate o suporte da HostGator.

---
**✅ Projeto pronto para produção!**