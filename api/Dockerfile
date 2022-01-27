# development stage
FROM node:17-alpine as dev
WORKDIR /home/app
EXPOSE 80

# production stage
FROM dev
COPY package.json .
RUN npm install
COPY . .
CMD npm start