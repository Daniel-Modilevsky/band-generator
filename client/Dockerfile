# Use official Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the entire frontend source code
COPY . .

# Set API URL in the environment
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=${REACT_APP_API_URL}

# Build the frontend
RUN npm run build

# Install `serve` for static hosting
RUN npm install -g serve

# Expose frontend port
EXPOSE 3000

# Serve the built frontend
CMD ["serve", "-s", "build"]
