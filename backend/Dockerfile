FROM node:18-alpine
WORKDIR /app
COPY package*.json .
RUN npm ci
COPY ./* .
RUN npx nest build
RUN npm run prisma-deploy
EXPOSE 3000
CMD [ "npm", "run", "start:prod" ]