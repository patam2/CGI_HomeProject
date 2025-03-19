#Koodid on võetud StackOverflowist (env) ja ülejäänud Claude poolt

FROM node:20-alpine AS build


# Set environment variables during the build process
ENV VITE_API_URL=http://localhost:8080



WORKDIR /app

COPY package*.json ./
COPY yarn*.lock ./

# Install dependencies
RUN npm install

# Force rebuild of esbuild to match versions
RUN node node_modules/esbuild/install.js




COPY . .

# Build the app
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy the build output
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx config if needed
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
