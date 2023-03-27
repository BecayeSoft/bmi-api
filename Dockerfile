FROM node:12

WORKDIR /app

COPY package*.json ./

# shell form
RUN npm install

# copy all local files to working dir
COPY ./ ./

ENV PORT=8080

EXPOSE 8080

# exec form: it doesn't startup a shell session
CMD [ "npm", "start" ]