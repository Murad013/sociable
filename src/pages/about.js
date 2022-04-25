import React from 'react';

const About = () => {
  return (
    <div className='About'>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
      <h1>The Story Behind Sociable</h1>
      <div className='text'>
              <p>Three senior computer science students, Murad Salameh, Anna Chieco, and Sean Gould got together to make Sociable for their Computer Science Seminar class.
        Sociable is a mock social media website like Twitter, Myspace, or Facebook. Users have the option to make an account, sign into a pre-existing account, share messages, and edit or delete their posts. To do this, we have a frontend using React JS, a RESTful API using NodeJS and Express, and a MySQL database. 
        The frontend is connected to a RESTful API in which it sends HTTP requests (GET, POST, PATCH, DELETE). These HTTP requests are what allow us to CRUD (Create Read Update Delete) in our database. Once the REST API receives these requests, it (depending on the request) get data, create data, change data, and/or delete data from the database, and then send back a response to the client. 
        This response could either be a simple ‘success’ message, an error, or a set of data that we can use for authentication or just simply displaying on the web. The database stores user information and an archive of content the user has shared/created. The database stores data about the user, such as their username, password, email, phone number, etc. All these components allow us to create a 
        dynamic website with infinite possibilities.</p>
        <p>Our main motivation for this project was to learn new technologies/skills that would be essential in our desired future professions. The things we wanted to learn through this project are as follows:
        <br></br>
        •	Learning MySQL/MySQL Workbench by creating a database that will store user information and be able to be queried by the backend.<br></br>
        •	Learning about a LAMP stack by hosting a VM on AWS for our database.<br></br>
        •	Learning JavaScript in order to be able to use React, Node, Express<br></br>
        •	Learning NodeJS and ExpressJS by creating a RESTful API that receives requests from the client and sends back a response depending on what that request requested, and because the API is connected to a database, the API will be able to send back a response with some data from the database, change data in the database, or even delete a record from the database.<br></br>
        •	Learning ReactJS by creating a frontend that connects with the RESTful API we create and making it able to send requests and receive responses from the database, change something in the database and delete records.
        </p>
      </div>
    </div>
  );
};

export default About;