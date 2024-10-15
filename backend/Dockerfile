FROM node:16

WORKDIR /app

COPY backend/package.json backend/package-lock.json ./
RUN npm install

COPY backend/ .

EXPOSE 3000

CMD ["node", "index.js"]
