# Base image with LTS version of Node.js
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy the rest of the application files
COPY . .

# Update dependencies
RUN npm update

# Install dependencies
RUN npm install

# Build typescript
RUN npm run build

# Expose the port that the application will run on
EXPOSE 3000

# Start the application
CMD ["npm", "run", "dev"]