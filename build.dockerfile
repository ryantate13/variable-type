FROM alpine:3.10
RUN apk add nodejs npm
RUN npm i -g npm
RUN mkdir /app
WORKDIR /app
COPY package.json /app/package.json
RUN npm install
COPY src /app/src
COPY tsconfig.json /app/tsconfig.json
CMD npm run build && cp package.json lib
