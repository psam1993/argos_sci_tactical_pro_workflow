# Etapa 1: imagem base leve com Nginx
FROM nginx:alpine

# Etapa 2: remove arquivos padrão do Nginx
RUN rm -rf /usr/share/nginx/html/*

# Etapa 3: copia o conteúdo do repositório para o diretório servido pelo Nginx
COPY . /usr/share/nginx/html

# Expõe a porta padrão do Nginx
EXPOSE 80

# Comando padrão para rodar o Nginx
CMD ["nginx", "-g", "daemon off;"]