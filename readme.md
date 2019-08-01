# API Documentation

## Getting Started

> First of all, you need to have installed **Yarn** to install the libraries and plugins.

> Then you need to execute the command  `yarn install` to install all plugins.


# Development Server

To view the api in the the development server run the command `yarn run dev`.

# Production Server

The source code was wrote in **ES6**.

If you want the api in mode production, you need to compile the source code with `yarn run build`. And then run `yarn start` to initialize the server.

# Database

You need to connect a **MongoDB Database** with the app.

> Go to the **.env** file and write the *MONGODB_URI* there.

### *Note*

For the database optimization, the images will be saved in your own pc. 


# Usage

## Add a book

To add a book, go to the *Add Book page* and complete all the form. Then you will see a page with all book posted.

> In the right of the form, you can see a table with top books.

## Like / Dislike post

To like / dislike a post, you have to click the book image and you will see a full page with the book information and the **Like / Dislike Button**.