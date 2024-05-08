# --------------------------------------------------
# Node configuration

FROM node:18 as builder

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app


RUN npm run build

# --------------------------------------------------
# NGINX CONFIGURATION

FROM nginx:latest

COPY --from=builder /app/build /usr/share/nginx/html

COPY --from=builder /app/nginx/default.conf /etc/nginx/conf.d/default.conf


EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]