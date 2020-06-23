FROM node:current
EXPOSE 8080

RUN mkdir -p /home/safespace
WORKDIR /home/safespace

COPY . /home/safespace

RUN npm install

CMD npm start