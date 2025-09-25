#!/bin/bash

# 🚀 Script para Build e Preparação do Deploy no cPanel
# A+ Engenharia e Segurança Ocupacional

echo "🔨 Iniciando build para deploy no cPanel..."

# Instalar dependências se necessário
echo "📦 Verificando dependências..."
npm install

# Limpar build anterior
echo "🧹 Limpando build anterior..."
rm -rf dist/

# Gerar build de produção
echo "⚡ Gerando build de produção..."
npm run build

# Verificar se build foi criado com sucesso
if [ -d "dist" ]; then
    echo "✅ Build gerado com sucesso!"
    echo "📂 Arquivos prontos na pasta 'dist'"
    
    # Criar arquivo .htaccess para o cPanel
    echo "📝 Criando arquivo .htaccess..."
    cat > dist/.htaccess << 'EOF'
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
EOF

    echo "✅ Arquivo .htaccess criado!"
    
    # Criar arquivo ZIP para facilitar upload
    echo "📦 Criando arquivo ZIP para upload..."
    cd dist
    zip -r ../aplus-engenharia-cpanel.zip .
    cd ..
    
    echo ""
    echo "🎉 PROJETO PRONTO PARA CPANEL!"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "📁 Pasta de build: dist/"
    echo "📦 Arquivo ZIP: aplus-engenharia-cpanel.zip"
    echo ""
    echo "📋 PRÓXIMOS PASSOS:"
    echo "1. Faça download do arquivo 'aplus-engenharia-cpanel.zip'"
    echo "2. Acesse seu cPanel da HostGator"
    echo "3. Vá em File Manager → public_html"
    echo "4. Extraia o ZIP diretamente na pasta public_html"
    echo "5. Pronto! Seu site estará online"
    echo ""
    echo "📚 Consulte: DEPLOY-CPANEL-HOSTGATOR.md para instruções detalhadas"
    
else
    echo "❌ Erro ao gerar build!"
    echo "Verifique se todas as dependências estão instaladas"
fi