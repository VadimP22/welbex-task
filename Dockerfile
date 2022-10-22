FROM node
WORKDIR /app
COPY ./backend ./
COPY ./frontend/build ./src/build

EXPOSE 8088

CMD ["node", "src/main.js"]