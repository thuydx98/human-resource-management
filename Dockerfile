# build stage
FROM node:13-alpine as builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm rebuild node-sass
# RUN npm run test
RUN npm run build

# production stage
FROM nginx:1.17-alpine

#Setup
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/build /usr/share/nginx/html
COPY --from=builder /app/entrypoint.sh /usr/share/nginx/

RUN chmod +x /usr/share/nginx/entrypoint.sh
CMD ["/bin/sh", "/usr/share/nginx/entrypoint.sh"]