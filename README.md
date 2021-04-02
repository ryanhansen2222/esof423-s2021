# Specialproject.io comment API
Specialproject.io comment API with Adonis\
[Website Through MSU school server connection](http://esof423.cs.montana.edu:4006/home)\

[Zoom Meeting Link For Group Members](https://us05web.zoom.us/j/9131164556?pwd=SjRjTmZLWWlQd1RQM2V4ZmR6Q0c2Zz09)\


## Description
specialproject is a premium video sharing service. This API is responsible
for the comment section for videos. Software heavily utilizes Adonis. Usage requires adonisjs, sqlite3, adonis-swagger, @adonisjs-ignitor, Node.js > 8.0.0, and NPM > 3.0.0. This project implements the comments in coordination with user created videos. This API requires that the media upload for the "video" is implemented by the user of the API. 

## Instructions

### 1. Clone repo

### 2. Navigate to /src

### 3. Open yardstick-archive directory and run: nodemon server.js

The special project API runs on an adonis framework with a sqlite as the database. It requires a number of dependencies including adonisjs, sqlite3, adonis-swagger, @adonisjs-ignitor, nodemon, Node.js > 8.0.0, and NPM > 3.0.0. The project was built on a Linux platform, but can be adapted to work on other operating systems. To use the API, first clone the repository at https://github.com/ryanhansen2222/esof423-s2021. Within this repository, navigate to /src. The adonis project to use within this folder will be named /yardstick-archive. Assuming all dependencies are installed, running nodemon server.js from the command line while in the directory yardstick-archive should start the project. This will initially be set up to run on the local host, but the .env file can be modified to match the needs of the user. Upon serving the application, the home screen should display the following page:

From this point, a user can view the documentation for the API, login, or sign up for the site. Upon creating an account or logging in, the home page changes to the following: 

Note that the difference between the previous two pages is the addition of the “My Videos” tab and the “Login” and “Sign Up” tabs have been replaced by “Logout.” The core functionality of the API works through the “My Videos” and “Videos” views. From within “My Videos,” new media can be uploaded to the site. Note that the media upload still needs to be implemented for this section and currently video creation simply creates a video title and description. Once a video has been created it can be edited or deleted from the “My Videos” page. This functionality is outlined by the screenshot below: 

Once a video has been posted to the site, users can comment on the video under the “Videos” tab. “Videos” contains a paginated view of videos posted to the site and users can comment by selecting a video and filling out the associated GUI on the /watchvideo view. Once a comment is posted, it appears in a paginated list of comments under the video content. Comments can be liked by any user, but comments can only be edited or deleted by the user that created them. This functionality should appear as in the following image:

The yardstick-archive repository can be copied and modified directly to meet the needs of the user. Alternatively database migrations, routes, edge files, controllers, and other required files can be used individually to meet the user’s needs from within their own adonis project.

