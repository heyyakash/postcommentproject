FROM node:21-alpine3.18
WORKDIR /usr/src/app
ARG DB
ARG JWTSEC
ENV DB_URL=${DB}
ENV JWT_SECRET=${JWTSEC}
COPY package*.json ./
RUN npm i
COPY . .
EXPOSE 8000
CMD [ "node","index" ]