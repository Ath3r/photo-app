FROM node:22.4

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

COPY .env.example .env

RUN npm run build

COPY prisma ./prisma/

RUN npx prisma generate

EXPOSE 5000

CMD ["npm", "start"]