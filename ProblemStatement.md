🍌 Objective

# Goal

Develop a robust social media backend REST-API that empowers users to post, comment, like, send friend requests, and reset their passwords using OTP for enhanced security.

1. Acceptance criteria

> RESTful Architecture

                Develop a RESTful API using Node.js, ExpressJS, and MongoDB for efficient data handling and routing control.

> Code Modularity

                Organize code using ES6 Modules for maintainability and modularity.

> User Authentication

                Implement a user authentication system with essential features like signup, login, and logout. Moreover, you have the opportunity to earn extra marks for implementing an advanced feature: the ability to log out from all devices. To achieve this, consider storing each login token in an additional array field within the user's document.

                Registration should include user details such as name, email, password, and gender. Additional fields can be included as needed.

> Post Management

                Implement CRUD operations for posts, including fields like caption and an image URL related to the post.

                Ensure that each post references the user who created it.

                Post can be updated or deleted only by the post owner.

> Comment System

                Develop a comment system that allows users to add, update, and delete comments on posts.

                Comments can be updated or deleted only by the post owner or the commenter.

> Like Functionality

                Create a like system for posts, including logic with MongoDB and population of documents.

                Display counts of likes and comments on posts.

                Populate user information (id, name, and email) for likes, comments, and posts.

> Friendship Features

                Implement a friendship system with features like getting user friends, managing pending friend requests, toggling friendships, and accepting/rejecting friend requests.

> User Profile Updates

                Enable users to update their profiles, including fields like name, gender, or avatar.

                Implement avatar uploads for user profiles.

> OTP-Based Password Reset (Additional Task)

                OTP-based password reset feature.

                Create controllers, models, and repositories for OTP management.

                You can use the Nodemailer library for email communication.

2. Tasks

> Project Setup

                Set up an Express.js application and configure related settings.

> Dependency Installation

                Install the necessary project dependencies based on the required functionalities.

> User Authentication

                Implement user registration and login routes.

                Develop user logout routes.

> User Profile

                Create routes for getting user details and updating user profiles.

                Implement avatar uploads.

> Post Management

                Set up routes and controllers for CRUD operations on posts.

                Handle image uploads for post images.

> Comment System

                Develop routes and controllers for managing comments on posts.

> Like Functionality

                Create routes and logic for liking and unliking posts and comments.

> Friendship Features

                Implement routes and controllers for user friendships, including getting friends, and accepting/rejecting requests.

> OTP-Based Password Reset

                Set up routes and controllers for sending OTPs, verifying OTPs, and resetting passwords.

> Error Handling and Logging

                Implement error handling middleware and request logging.

> Testing and Documentation

                Thoroughly test the API to ensure it meets acceptance criteria.

                Document the application's functionalities, dependencies, and code organization for clarity.

3. API Structure

# The API structure for the "Social-Media" project can be organized as follows:

> Authentication Routes

                /api/users/signup: Register a new user account.

                /api/users/signin: Log in as a user.

                /api/users/logout: Log out the currently logged-in user.

                /api/users/logout-all-devices: Log out the user from all devices.

> User Profile Routes

                /api/users/get-details/:userld: Retrieve user information, ensuring sensitive data like passwords is not exposed.

                /api/users/get-all-details: Retrieve information for all users, avoiding display of sensitive credentials like passwords.

                /api/users/update-details/:userld: Update user details while ensuring that sensitive data like passwords remains secure and undisclosed.

> Post Routes

                /api/posts/all: Retrieve all posts from various users to compile a news feed.

                /api/posts/:postld: Retrieve a specific post by ID.

                /api/posts/: Retrieve all posts for a specific user to display on their profile page.

                /api/posts/: Create a new post.

                /api/posts/:postld: Delete a specific post.

                /api/posts/:postld: Update a specific post.

# Note that for the same routes, you can change the HTTP methods (GET, POST, PUT, DELETE). For example:
                
                Use DELETE("/api/posts/:postid") to delete a specific post.

                Use PUT("/api/posts/:postld") to update a specific post.

# In both cases, the route remains the same; only the HTTP method is changed.

> Comment Routes

                /api/comments/:postld: Get comments for a specific post.

                /api/comments/:postld: Add a comment to a specific post.

                /api/comments/:commentld: Delete a specific comment.

                /api/comments/:commentld: Update a specific comment.

# Note: For the same routes, change the HTTP methods (GET, POST, PUT, DELETE).

> Like Routes

                /api/likes/:id: Get likes for a specific post or comment.

                /api/likes/toggle/:id: Toggle like on a post or comment.

> Friendship Routes

                /api/friends/get-friends/:userld: Get a user's friends.

                /api/friends/get-pending-requests: Get pending friend requests.

                /api/friends/toggle-friendship/friendld: Toggle friendship with another user.

                /api/friends/response-to-request/:friendld: Accept or reject a friend request.

> OTP Routes

                /api/otp/send: Send an OTP for password reset.

                /api/otp/verify: Verify an OTP.

                /api/otp/reset-password: Reset the user's password.

4. Link to collection routes:
   
> Link to the Postman
  
                https://www.postman.com/mission-participant-11895744/workspace/social-media-api/collection/28528017-a6cf0957-20a4-41f0-bb7d-7318d19b25e3?action=share&creator=28528017

# This postman collection consists of folders with different routes to implement the project.

# Steps to be followed:

1. Click on the URL provided for the collection.
   
2. Ensure you are logged in using your postman credentials
   
3. Fork this collection and proceed further to test your application.
   
# Note: Don't forget to change the parameters (Objectld, postld, commentld, etc.) wherever necessary.


5. Evaluation parameters
   
> EXPRESS.JS, MONGOOSE & MONGODB SETUP
Max score: 50
This code implements Express.js using MVC architecture with ES6 Modules for modularity, separating data handling, interface rendering, and routing control. Additionally, it configures Mongoose for efficient MongoDB interaction. 

> CODE MODULARITY AND ORGANIZATION
Max score: 100
Ensure your code is well-structured and modular for clarity and maintainability, adhering to naming conventions and best practices while providing thorough comments and documentation for future development and collaboration.

> USER AUTHENTICATION
Max score: 100
Implement a secure and robust user authentication system with registration, login, and logout functionalities, while applying necessary security measures to protect user credentials and sessions.

> POST MANAGEMENT AND COMMENT SYSTEM
Max score: 75
Develop a functional post management system enabling users to create, edit, and delete posts, with an integrated comment system that supports commenting on posts and comment management.

> LIKE FUNCTIONALITY AND POPULATED DATA
Max score: 75
Implement a 'like' functionality for posts or other relevant features in the application, and ensure that data is properly populated and displayed within the application to provide a seamless user experience. 

> FRIENDSHIP FEATURES AND USER PROFILE UPDATES
Max score: 50
Incorporate user connection features like adding friends or following other users, and enable users to update their profiles with relevant information and preferences.

> OTP-BASED PASSWORD RESET
Max score: 50
Integrate a secure OTP-based password reset mechanism to enhance user account security and ensure a user-friendly and reliable reset process, delivering a seamless experience. 

> ADDITIONAL TASKS
Max score: 50
Successfully complete all additional tasks specified for the project.

> INNOVATION
Max score: 50
Highlight innovative utilization of Node.js and Express.js features, along with performance optimization best practices, and showcase creative user interface and user experience design while minimizing reliance on external dependencies.


    


