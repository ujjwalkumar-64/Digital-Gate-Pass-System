# Use a specific version of Node.js
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files (including Prisma schema)
COPY . .

# Generate the Prisma client
RUN npx prisma generate

# Expose port 4000
EXPOSE 3000

# Run the application
CMD ["npm", "start"]

