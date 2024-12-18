# Use the official Node.js 14 image as the base image
FROM node:latest

# Set the working directory to /app
WORKDIR /app/web

# Copy the package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the Next.js application
#RUN npm run build

# Start the Next.js application
CMD ["npm", "run", "dev"]
