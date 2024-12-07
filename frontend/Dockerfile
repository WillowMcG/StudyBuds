FROM node:16

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

RUN npm install react-scripts react-router-dom

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
