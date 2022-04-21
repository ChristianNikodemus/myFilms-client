# myFilms - Client

Welcome to the front end of myFilms Application. This project uses the front end framework: React, to compliment my API Database!

## Objective

Using React, build the client-side for an application called myFlims based on its existing server-side code (REST API and database).

## Technical Features

- The application is a single-page application (SPA)
- Uses state routing to navigate between views and share URLs
- Gives users the option to filter movies
- Gives users the option to sort movies
- Initially uses Parcel as its build tool
- Written using the React library and in ES2015+
- Written with React Redux (hence respecting the Flux pattern)
- Uses Bootstrap as a UI library for styling and responsiveness
- Contains a mix of class components and function components
- Hosted online

## How to Start

First clone this repository to your machine locally.

Then, to start the project simply navigate to the project in terminal and run:

`npm install`

This installs all the dependencies to run the program, then run:

`npm start`

This starts the program, your terminal will prompt you that the server is running at a url such as `http://localhost:1234` for example. You can then go to your browser and enter this url in the address bar to see the project in action!

## JSDoc Documentation

### View JSDoc Documentation

To open the JSDoc documentation, simply navigate to folder called "out" at the first level of this project, then find the "index.html" file and open it within your internet browser.

### Build JSDoc Documentation

You may want to re-build the documentation, which is a benefit for if say for example, if another contributor adds additional JSDoc comments. First, you'll need to install JSDoc which you can do by entering this command within terminal: `npm install -g jsdoc`, then make sure you're navigated to this project within terminal and enter the command `jsdoc src`. This will rebuild the JSDoc documentation.
