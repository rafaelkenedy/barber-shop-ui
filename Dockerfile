FROM node:22.14.0

# Atualiza e instala dependências básicas
RUN apt-get update && apt-get install -y --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# Diretório da aplicação
ENV INSTALL_PATH /barber-shop-ui
RUN mkdir -p $INSTALL_PATH
WORKDIR $INSTALL_PATH

# Copia package.json e yarn.lock
COPY package*.json ./

# Instala Angular CLI global
RUN yarn global add @angular/cli@19.2.5

# Instala dependências do projeto
RUN yarn install

# Copia o restante da aplicação
COPY . .

# Expõe porta que o Angular usa
EXPOSE 4200

# Comando padrão ao iniciar o container
CMD ["ng", "serve", "--host", "0.0.0.0"]
