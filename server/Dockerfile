FROM node:latest

# create app directory
WORKDIR /usr/src/app

# install dependencies
COPY package*.json ./
RUN npm install

# bundle app source
COPY . .

EXPOSE 4000
CMD [ "npm", "start" ]
