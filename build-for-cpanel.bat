@echo off
REM 🚀 Script para Build e Preparação do Deploy no cPanel (Windows)
REM A+ Engenharia e Segurança Ocupacional

echo 🔨 Iniciando build para deploy no cPanel...

REM Instalar dependências se necessário
echo 📦 Verificando dependências...
call npm install

REM Limpar build anterior
echo 🧹 Limpando build anterior...
if exist dist rmdir /s /q dist

REM Gerar build de produção
echo ⚡ Gerando build de produção...
call npm run build

REM Verificar se build foi criado com sucesso
if exist dist (
    echo ✅ Build gerado com sucesso!
    echo 📂 Arquivos prontos na pasta 'dist'
    
    REM Criar arquivo .htaccess para o cPanel
    echo 📝 Criando arquivo .htaccess...
    (
        echo Options -MultiViews
        echo RewriteEngine On
        echo RewriteCond %%{REQUEST_FILENAME} !-f
        echo RewriteRule ^ index.html [QR,L]
        echo.
        echo # Cache para melhor performance
        echo ^<IfModule mod_expires.c^>
        echo ExpiresActive on
        echo ExpiresByType text/css "access plus 1 year"
        echo ExpiresByType application/javascript "access plus 1 year"
        echo ExpiresByType image/png "access plus 1 year"
        echo ExpiresByType image/jpg "access plus 1 year"
        echo ExpiresByType image/jpeg "access plus 1 year"
        echo ^</IfModule^>
        echo.
        echo # Compressão GZIP
        echo ^<IfModule mod_deflate.c^>
        echo AddOutputFilterByType DEFLATE text/plain
        echo AddOutputFilterByType DEFLATE text/html
        echo AddOutputFilterByType DEFLATE text/xml
        echo AddOutputFilterByType DEFLATE text/css
        echo AddOutputFilterByType DEFLATE application/xml
        echo AddOutputFilterByType DEFLATE application/xhtml+xml
        echo AddOutputFilterByType DEFLATE application/rss+xml
        echo AddOutputFilterByType DEFLATE application/javascript
        echo AddOutputFilterByType DEFLATE application/x-javascript
        echo ^</IfModule^>
    ) > dist\.htaccess

    echo ✅ Arquivo .htaccess criado!
    
    echo.
    echo 🎉 PROJETO PRONTO PARA CPANEL!
    echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    echo 📁 Pasta de build: dist\
    echo.
    echo 📋 PRÓXIMOS PASSOS:
    echo 1. Compacte todos os arquivos da pasta 'dist'
    echo 2. Acesse seu cPanel da HostGator
    echo 3. Vá em File Manager → public_html
    echo 4. Faça upload e extraia os arquivos
    echo 5. Pronto! Seu site estará online
    echo.
    echo 📚 Consulte: DEPLOY-CPANEL-HOSTGATOR.md para instruções detalhadas
    
) else (
    echo ❌ Erro ao gerar build!
    echo Verifique se todas as dependências estão instaladas
)

pause