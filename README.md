## Udacity: Website Performance Optimization project

### Project Overview
This is Udacity's project on Website Optimization from the Front-End Web Developer Nanodegree. The assignment is to improve the performance of a provided website in terms of page loading time and achieving a rendering average of 60 frames per second (fps).

### Getting Started

####Dependencies
- node.js
- grunt-cli

####Folder Structure
The development code is contained in the /src folder and the production code is contained in the /dist folder

#### Install/Run Grunt (http://gruntjs.com/getting-started Getting Started Guide)
- Change to the project's root directory.
- Install project dependencies with npm install.
- Run Grunt with grunt.
The build process will:
- minify all html, css and js files
- inline css files
- resize and optimize image compression
- save all production code files in the folder ./dist
- serve the ./dist folder locally
- pagespeed test
