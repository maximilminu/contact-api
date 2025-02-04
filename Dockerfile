FROM node:16
WORKDIR /contacts-api
COPY package*.json ./
RUN npm install nodemon
COPY . .
EXPOSE 8000
# CMD ["npx", "nodemon", "index.js"]
CMD ["npx", "nodemon", "--legacy-watch", "src/index.js"]

# CMD ["nodemon","npm", "run", "start:dev"]