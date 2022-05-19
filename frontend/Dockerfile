# Install dependencies only when needed
FROM node:18

COPY . /code
WORKDIR /code

ENV NODE_ENV=production

RUN npm install
RUN npm run build

EXPOSE 8000

CMD ["npm", "start"]