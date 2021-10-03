To run locally

Requirements: MongoDBCommunnityServer
https://www.mongodb.com/download-center/community

You can download the MongoDB Community Server from the MongoDB download page. The download is a zip file. Unzip the contents, change the folder name to "mongodb", and move it to your users home directory. From there, create a "mongodb-data" directory in your user directory to store the database data.
You can start the server using the following command. Make sure to swap out "/Users/Leo/" with the correct path to your users home directory.

/Users/em/mongodb/bin/mongod --dbpath=/Users/em/mongodb-data

/usr/local/Cellar/mongodb-community/4.2.5/bin/mongod --dbpath=/Users/em/mongodb-data

1. git clone
2. cd name of app

# Back End

3. yarn install
4. create .env file in the root of your project and create environment variables listed below.
   1. PORT=8080
   2. SEND_GRID_API_KEY= get your own api key
   3. JWT_SECRET= 'can be any password'
   4. MONGODB_URL=mongodb://127.0.0.1:27017/nameofyourapp
5. yarn dev

# Front End

1. cd client
2. yarn
3. yarn start

Front end will run on port 3000 and will proxy to back end on port 8080

To run jest test suite run npm run test or yarn test

If you want a GUI for your database use either Robo3t or MongoDB Compass.

Make sure to set environment variables for PORT, SENDGRID_API_KEY, JWT_SECRET, MONGODB_URL in a .env file at the root of your project.

To deploy:

Set the same environment variables for heroku/dokku except the PORT variable can be left out.
Heroku Environment variables can be set through the command line or directly on heroku.com.
Dokku environments variables can be set from the command line only.
dokku config:set appname KEY=value KEY_2=value2 KEY_3=value3

[![Run in Postman](https://run.pstmn.io/button.svg)](<https://app.getpostman.com/run-collection/9736846b31eae2710b6c#?env%5BTask%20Manager%20API%20(dev)%5D=W3siZGVzY3JpcHRpb24iOnsiY29udGVudCI6IiIsInR5cGUiOiJ0ZXh0L3BsYWluIn0sInZhbHVlIjoibG9jYWxob3N0OjMwMDAiLCJrZXkiOiJ1cmwiLCJlbmFibGVkIjp0cnVlfSx7InZhbHVlIjoiZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmZhV1FpT2lJMVkyRTFOR05oWkRCa01qVTRNak5sT1ROa05UTmtZbVVpTENKcFlYUWlPakUxTlRRek56ZzNNeko5LlJEY1Q3c2V4d0NYZWh5Y3RwTDV2WG9HUDQxSW5KQ1ZSQVlmRzFMSjBEa0EiLCJrZXkiOiJhdXRoVG9rZW4iLCJlbmFibGVkIjp0cnVlfV0=>)
