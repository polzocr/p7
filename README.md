# Groupomania #

## Installation ##

Here are the dependancies you need to install:
- NodeJS 
- Express
- Sequelize
- Vue.js 2
On Windows, these installations require to use PowerShell in administrator mode.

Then : 
- git clone https://github.com/polzocr/p7.git
- cd backend
- run `npm install`
- copy .env.sample and rename it .env and add your credentials
- run `npx sequelize-cli db:migrate` to generate tables (the database must be created manually)

In another terminal : 
- cd frontend 
- cd vue-frontend
- run `npm install`



## Usage ##

- In the backend : 
Run `node server`

- In the Frontend : 
Run `npm run serve`

Use `Ctrl+C` in the terminal to stop the local server.
