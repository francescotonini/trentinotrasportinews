FROM node:6.9.2-alpine

# Install app dependencies
COPY package.json /src/package.json
RUN cd /src; npm install

# Copy app bundle
COPY . /src

# Set env
ENV NODE_ENV=production

# Here we go
CMD ["node", "/src/index.js"]
