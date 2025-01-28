FROM node:20.18-bullseye

WORKDIR /app

COPY ./package*.json /app/

RUN npm install

COPY . /app/

EXPOSE 3000

CMD ["sh", "runBack.sh"]

