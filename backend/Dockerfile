FROM node:20

WORKDIR /app

ENV NODE_ENV=development

COPY package.json package-lock.json ./

RUN npm install

RUN npm install dotenv seedrandom

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
