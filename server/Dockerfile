# Use official Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the entire backend source code
COPY . .

# Install TypeScript globally (for compiling TypeScript)
RUN npm install -g typescript

# Compile TypeScript files into JavaScript
RUN npm run build

# Expose API port
EXPOSE 4050

# Run the compiled JavaScript file, NOT TypeScript
CMD ["node", "dist/server.js"]
