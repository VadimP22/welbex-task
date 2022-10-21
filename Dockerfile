FROM node
WORKDIR /app
COPY ./backend ./

EXPOSE 8088

CMD ["node", "src/main.js"]