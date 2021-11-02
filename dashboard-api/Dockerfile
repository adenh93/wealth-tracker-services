FROM node:14-alpine as development
WORKDIR /usr/app
EXPOSE 4000
COPY . .
RUN yarn
CMD ["yarn", "start"]