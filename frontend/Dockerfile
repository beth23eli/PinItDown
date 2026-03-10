# Stage 1: build the React Application
FROM node:22-alpine AS build

WORKDIR /usr/app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:1.27-alpine

# Copy the built files to the Nginx web directory
COPY --from=build /usr/app/dist /usr/share/nginx/html


EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]