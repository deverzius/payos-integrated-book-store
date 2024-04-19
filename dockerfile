
FROM node:latest
WORKDIR /usr/src/app
EXPOSE 8080
CMD ["node", "src/index.js"]
COPY package*.json ./
RUN npm ci
COPY . .