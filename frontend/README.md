Getting Started with the MERN Application
This project is a MERN stack application, consisting of a React frontend and an Express backend connected to a MongoDB database.

Frontend
The frontend of the application is built using Create React App. It includes React, Tailwind CSS, and other dependencies for building and testing the user interface.

Available Scripts
In the frontend project directory, you can run:

npm start
Runs the React app in development mode.
Open http://localhost:3000 to view it in your browser.

The page will reload when you make changes.
You may also see any lint errors in the console.

npm build
Builds the React app for production to the build folder.
The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

npm test
Launches the test runner in interactive watch mode.
See the section about running tests for more information.

npm run eject
Note: this is a one-way operation. Once you eject, you can't go back!

If you need to customize the build tool and configuration, you can eject at any time. This command will remove the single build dependency from your project. Instead, it will copy all configuration files and dependencies (webpack, Babel, ESLint, etc.) directly into your project. All commands except eject will still work, but they will point to the copied scripts so you can tweak them.

You do not have to use eject. The default configuration is suitable for most projects, and you should only consider ejecting if you need more control over the configuration.

Proxy Configuration
The frontend is set up to proxy requests to the backend server running on http://localhost:5000. This helps with development by avoiding CORS issues.

Dependencies
@heroicons/react: Icon components
@testing-library/jest-dom, @testing-library/react, @testing-library/user-event: Testing utilities
axios: HTTP client
jwt-decode: JWT decoding
react, react-dom: Core React libraries
react-router-dom: Routing
react-scripts: Scripts for Create React App
react-toastify: Toast notifications
tailwindcss, autoprefixer, postcss: Styling
Backend
The backend is built with Express and connected to MongoDB using Mongoose. It handles authentication, data storage, and application logic.

Available Scripts
In the backend project directory, you can run:

npm start
Starts the backend server using Node.js.

npm run dev
Starts the backend server using Nodemon, which will automatically restart the server on file changes.

npm test
Placeholder script for running tests (currently not implemented).

Dependencies
bcrypt, bcryptjs: Password hashing
cors: Cross-Origin Resource Sharing
dotenv: Environment variable management
express: Web framework
jsonwebtoken: JSON Web Token handling
mongoose: MongoDB object modeling
Dev Dependencies
nodemon: Tool for automatically restarting the server during development
Learn More
To learn more about React and Express, check out their respective documentation:

React documentation
Express documentation
For more information on how to deploy the application, see the Create React App deployment documentation and Node.js deployment strategies.

POSTMAN_API Documentation URL : https://documenter.getpostman.com/view/33724615/2sA3rwLtmT