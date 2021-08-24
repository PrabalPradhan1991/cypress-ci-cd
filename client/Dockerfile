FROM node:10-alpine as builder

COPY package.json package-lock.json ./
RUN npm set progress=false && npm config set depth 0 && npm cache clean --force
## Storing node modules on a separate layer will prevent unnecessary npm installs at each build
RUN npm i && mkdir /ng-app && mv ./node_modules ./ng-app
WORKDIR /ng-app
COPY . .
RUN pwd
# RUN ANGULAR_CLI_ENV=prod && npm run config
RUN npm run build

FROM nginx:1.17.6-alpine
## Remove default Nginx website
COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /ng-app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
# expose port 80
EXPOSE 80
# run nginx
CMD ["nginx", "-g", "daemon off;"]