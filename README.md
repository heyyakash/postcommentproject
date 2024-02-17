# Post-Comment-App
This app is literally what the name suggests. Its an application which lets users create posts and comment on their or others' post.
Deployed on [https://post-comment-app.onrender.com](https://post-comment-app.onrender.com)
##  How to set up the application locally
There are 2 ways to setup and run the application locally
1. Using Nodejs
2. Using Docker

Prerequisites:
1. MongoDB Atlas account and a running cluster and its uri
2. NodeJs ([How to install NodeJS ?](https://nodejs.org/en/learn/getting-started/how-to-install-nodejs))
3. Docker ([How to install Docker ?](https://docs.docker.com/engine/install/))

Lets get started
### Installation using NodeJS
1. Clone the repository and navigate to the root folder.
2. Creat a ```.env``` file in root folder
   
   ``` bash
   touch .env
   ```
   
4. Enter the following details in the ```.env``` file

   ``` bash
   DB_URL = YOUR_MONGO_URL
   JWT_SECRET = YOUR_JSON_WEB_TOKEN_SECRET
   ```
   eg.
   ``` bash
   DB_URL = mongodb://username:password@host:port/database
   JWT_SECRET = sdkasdklakwko12k3w1l32l2kdflksdklsjke
   ```
   
6. Open the terminal in the root folder and run the following commands :

   ``` bash
   npm i && node index
   ```
   
8. Once this is done, the server is up and runnning at port 8000

   ``` bash
   DB Connected Successfully
   Server is listening at port : 8000
   ```

### Using with docker
1. To run the app with docker, run the following command

   ``` bash
   docker build --build-arg DB="mongodb://username:password@host:port/database" \
    --build-arg  JWTSEC="sdkasdklakwko12k3w1l32l2kdflksdklsjke" \
    -t post-comment-app:latest .
   ```
   
2. To run the application, run

   ``` bash
   docker run -it --rm --name postcommentapp -p 8000:8000 post-comment-app:latest 
   ```
   
3. The Server is up and running on localhost:8000

## Underlying Architecture
### Stack
- Backend - **NodeJS**
- Database - **MongoDB**
### Flow Chart
![Screenshot from 2024-02-17 14-44-07](https://github.com/heyyakash/postcommentproject/assets/85030597/3b94827d-b0e7-4225-8226-c77954700f23)
### Database Structure
- Users collection
  
  | Name string | Email string | Password string | Image string |
  |------|-------|----------|-------|

- Posts

  | Content string | Author objectID (ref users) | CreatedAt date | Comments []ObjectID (ref comments) |
  |----------------|----------------------------|-----------------|------------------------------------|

- Comments

  | Text String | Author (ref users) | CreatedAt Date |
  |-------------|--------------------|----------------|

## How stuff works behind the scenes
1. Users can view the posts without logging in but if they wish to post or comment something, they have to login.
2. Users are logged in with a JWT cookie.
3. Once they are done, they can logout and view again

## Screenshot
![Screenshot from 2024-02-17 15-00-58](https://github.com/heyyakash/postcommentproject/assets/85030597/47a69dbb-67d2-42d3-ae82-755548b74e4e)



