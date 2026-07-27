# Use official Node.js image
FROM node:22-alpine

# Create app directory
WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy project files
COPY . .

# Expose Express port
EXPOSE 5000

# Start the server
CMD ["npm", "start"]