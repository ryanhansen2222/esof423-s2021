# Specialproject.io Comment API
Comment API with AdonisJS Framework\
[Connect via MSU-Secure Network](http://esof423.cs.montana.edu:4006/home)

[Zoom Meeting](https://us05web.zoom.us/j/9131164556?pwd=SjRjTmZLWWlQd1RQM2V4ZmR6Q0c2Zz09)

Contributors: Ryan Hansen, Alec VanderKolk, Alan Tong, Samuel Forbes

## Description
specialproject is a premium video sharing service. This API is responsible for the comment section for videos. Software heavily utilizes AdonisJS. 

### Dependencies 
* Node packet manager >= 3.0
* Sqlite3
* AdonisJS 
    - @adonisjs-ignitor
    - @adonisjs-validator
    - @adonisjs-vow
    - @adonisjs-lucid

## Installation
1. From the terminal, clone the github repository via https by running
    ```
    git clone https://github.com/ryanhansen2222/esof423-s2021.git
    ```
2. In the esof423-s2021.git repostory, navigate to src/yardstick. Run the following commands:
    ```
    npm install
    cp .env.example .env
    ```
3. Inside the newly created .env file, verify the correct host and port numbers to develop locally on your network.
4. Execute the following in the yardstick directory:
    ```
    nodemon server.js 
    ```
    If you do not have nodemon installed for node.js development, run:
    ```
    adonis serve --dev
    ```
5. Navigate to ***http://{HOST}:{PORT}***, with HOST and PORT from your .env file.
6. If database error occurs when viewing ***videos***, execute the following commands in the src/yardstick repostiory to run the migration on the database:
    ```
    adonis migration:reset
    adonis migration:run
    ```
7. The site should now be functional!

## Selenium Testing

A Selenium test suite is included within the repository under /src/yardstick-archive/public. To run this, the Selenium ide is a required extension from your browser. Select the Selenium extension in your browser and choose open existing project. Select the 423 Test Suite.side file. Then, the url within the .side files will need to be changed to match your working url or local host. A video showing this test suite running successfully can be found [here](https://youtu.be/ZJiIl9BfRrE). 

## Additional Technical Documentation
The special project API runs on an AdonisJS framework with a sqlite3 as the database. Upon serving the application, the home screen should display the following page:

![img1](https://user-images.githubusercontent.com/56380447/113443175-acf10000-93ae-11eb-8220-7abcea770b77.png)

From this point, a user can view the documentation for the API, login, or sign up for the site. Upon creating an account or logging in, the home page changes to the following: 

![img2](https://user-images.githubusercontent.com/56380447/113443246-d01baf80-93ae-11eb-8f5a-db06176d47cf.png)

Note that the difference between the previous two pages is the addition of the “My Videos” tab and the “Login” and “Sign Up” tabs have been replaced by “Logout.” The core functionality of the API works through the “My Videos” and “Videos” views. From within “My Videos,” new media can be uploaded to the site. Note that the media upload still needs to be implemented for this section and currently video creation simply creates a video title and description. Once a video has been created it can be edited or deleted from the “My Videos” page. This functionality is outlined by the screenshot below:

![img3](https://user-images.githubusercontent.com/56380447/113443317-f6414f80-93ae-11eb-8476-ed40c599c4a8.png)

Once a video has been posted to the site, users can comment on the video under the “Videos” tab. “Videos” contains a paginated view of videos posted to the site and users can comment by selecting a video and filling out the associated GUI on the /watchvideo view. Once a comment is posted, it appears in a paginated list of comments under the video content. Comments can be liked by any user, but comments can only be edited or deleted by the user that created them. This functionality should appear as in the following image:

![img4](https://user-images.githubusercontent.com/56380447/113443341-035e3e80-93af-11eb-8633-7ed07bab4482.png)

The yardstick-archive repository can be copied and modified directly to meet the needs of the user. Alternatively database migrations, routes, edge files, controllers, and other required files can be used individually to meet the user’s needs from within their own adonis project.
