FROM node:20-alpine
COPY ./src/ptest-environment-switcher /ptest-environment-switcher
WORKDIR /ptest-environment-switcher
RUN npm install -g pnpm
RUN pnpm i
# RUN npm install
CMD ["npm", "start"]