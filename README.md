<a name="readme-top"></a>

<br />
<div align="center">
 

<h3 align="center">Employee Managment</h3>

  <p align="center">
    WIP(Work In Progress),
    Self Practice MERN Stack application for managing a factory.
    <br>
    >>More Information Below.<<
    <br />
</div>

<!-- ABOUT THE PROJECT -->
## About The Project

This is a self practice project i've been working on for the past few days (as of this time of readme creation).
This MERN stack web-application is about "Managing" a factory/office etc.

Currently as it is **still** Work In Progress the main functionalities are:

**<h4>Login -</h4>**  <p>Users can login through Full Name and Email, those are verified with a web service on the backend.
How it is verified? pretty simple for now using [JsonPlaceHolder](https://jsonplaceholder.typicode.com/users)<p>
<br>
**BUT**<br>
Im Using MongooseDB and have created a Modal of Users & Employees, routing to the profile page is only possible if the user is on the modal of user\employee.
<br>
<br>
**Why?** <br>For the practice of using authentication with a WebService as well as a DataBase.
Succesful Login receives the following response from the server => JWT-Access-Token as well as JWT-Refresh-Token, and user's ID for routing to the profile.

**<h4>Editing Profile -</h4>**

Users can edit their First Name and Last Name for now.
Simply sents updated user info to the server, the server updates and returns the updated data.
<br>
**NOTE:** <br>Yes, even if the First Name or Last Name are changed, it is **Changed** on the DB but not on the JsonPlaceHolder, because the "verify" is against the json API.
so login is still using the "Old" Data to login. >Will be changed after i'll just add the registartion of my own users<

**<h4>View Shifts -</h4>**

Users can view their own shifts under the "Shifts" Tab, each user has his own Shifts and can see who works with them on that shifts.
As I've just made it on the go, I didn't implement "Roles" but each Employee on the Scheme has Department(which is a Scheme by itself), and each Department
has a Manager, which is an Employee also(Employee Scheme) so for now i've just made a "workaround".
Only Managers can "Create Shift" or "Delete Shift", later ill add "Edit Shift", other employess can click on employees and head to their profiles and see their shifts.

**<h4>Logout -</h4>**
Just a simple logout nothing special, user's token are saved into localStorage after hitting the logout it gets deleted and user redirected to homepage/login page.





### Technologies:
  **Front-End:**
  - ReactJS
  - Axios
  - TailwindCSS
  - React-Redux

  **Back-End:**
  - NodeJS
  - Express
  - Axios
  - JWT
  - MongoDB
<p align="right">(<a href="#readme-top">back to top</a>)</p>




### Installation


1. Clone the repo
   ```sh
   git clone [https://github.com/vladpr31/factory-managment-mern.git](https://github.com/vladpr31/factory-managment-mern)
   ```
2. Install NPM packages
   ```sh
   npm install
   ```

3. Logging In\Using Stuff
   ```sh
   use the jsons in the collections folder. 
   ```
<p align="right">(<a href="#readme-top">back to top</a>)</p>




<!-- ROADMAP -->
## Roadmap

- [ ] Add Registartion 
- [ ] Add my own verification of users.
- [ ] beautify the Front-End instead of the 1920s look it has now
- [ ] Add Edit Shifts option
- [ ] Think of some more features ideas.. 
   


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<p align="right">(<a href="#readme-top">back to top</a>)</p>

