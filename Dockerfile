FROM node:14

# Aboutmaintainer
LABEL maintainer="Abishan <abishanchemjong@gmail.com>"

WORKDIR /app

# Copy package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install npm dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

EXPOSE 5500

# Start app
CMD ["node", "server.js"]
