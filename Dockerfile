FROM node:8.9.3-alpine
MAINTAINER Francesco Tonini <francescoantoniotonini@gmail.com>
ENV REFRESHED_AT 2017-12-13

COPY . /src
RUN cd /src && npm install --production

CMD ["node", "/src/index.js"]
