FROM node:18-alpine

WORKDIR /app

COPY . .

RUN npm install --legacy-peer-deps

RUN npm run build

FROM nginx:alpine
COPY --from=0 /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
