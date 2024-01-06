FROM node:slim

WORKDIR /app


# install chrome
RUN apt-get update && apt-get install curl gnupg -y \
  && curl --location --silent https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
  && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
  && apt-get update \
  && apt-get install google-chrome-stable -y --no-install-recommends \
  && rm -rf /var/lib/apt/lists/*


# puppeteer env
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true


# setup project
COPY package*.json .

RUN npm ci

COPY ./* .

RUN npx prisma generate \
  && npx prisma migrate deploy \
  && npm run build

EXPOSE 3001

CMD ["npm", "run", "start:prod"]