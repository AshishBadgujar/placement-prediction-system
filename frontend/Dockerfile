FROM node:18.14-alpine

WORKDIR /app
COPY ./package.json .
RUN npm install

EXPOSE 3000
CMD ["npm", "start"]