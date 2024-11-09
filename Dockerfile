FROM node:20

# Set the working directory
WORKDIR /app





# Copy all other source files
COPY . .
# install the app
RUN npm install --production

# Build the app
RUN npm run build



# Run the app
CMD ["npm", "run"]