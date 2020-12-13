# build stage
FROM node:alpine as builder

WORKDIR /
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

COPY --from=builder /build /usr/share/nginx/html
COPY --from=builder /entrypoint.sh /usr/share/nginx/

RUN chmod +x /usr/share/nginx/entrypoint.sh
CMD ["/bin/sh", "/usr/share/nginx/entrypoint.sh"]