#FROM node:18-alpine
FROM node:20

#WORKDIR /app
WORKDIR /usr/src/app


COPY package.json package-lock.json ./

#RUN npm ci --only=production
# Install dependencies
RUN npm install


COPY . .

EXPOSE 5000

CMD ["node", "server.js"]