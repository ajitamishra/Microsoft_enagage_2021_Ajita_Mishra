# Microsoft_engage_2021_Ajita_Mishra

## About Project

### An assignment submission tool [submitool](https://submitool.netlify.app/) .

### Key features

- Teachers can create/upload assignment.
- Students can view assignment for all subjects
- Students can make submission to assignment.
- Teachers can view the submissions and manually assign grades. 
-  Admin can create subjects.
-  Admin can enroll teachers and students to subjects.

This app is open to add features and I will be working on as and when time 
permits me.Frontend for admin role is not designed yet only APIs are designed for admin functionalities due to time constraint.

### Project setup

To run this project nodejs must be installed on your systm.


- Clone the repo 

$ https://github.com/ajitamishra/Microsoft_engage_2021_Ajita_Mishra.git

- Installation 

Run below command for both Client and Server to complete installation of required modules

$ npm install

- Run

Below command will trigger both Server and Client

$ npm run dev

Check on http://localhost:3000. Your app must be app and running.

### Tech Stack

- ReactJs (FE)
- NodeJs  (BE)
- MongoDB (DB)


### User Roles

- Admin
- Teacher
- Student

### APIs

- /login :- Post request for login

Please type role as 'Teacher' or 'Student'
UserId for teacher can be prefixed with UT forex :- 'UT38'
and for student can be prefixed with ST forex :- 'ST60'


- /register:- Post request for register

##### Admin

- /api/users/enroll :- Put request to enroll teachers and students to subject.
- /api/subjects/create :- Post request to create subjects.
- /api/subjects/add-teacher:- Put request add teacher to subjects.

##### Teacher

- /api/subjects/create-assignment :- Post request to create assignments.
- /api/subjects/all-submissions/:assignmentId :- Get request to fetch all submissions based on assignment id.
- api/subjects/download/:fileName :- Get request to download submission file.

##### Student

- /api/users/submit-assignment:- Post request to submit assignment.
- /api/users/subjects/:userId :- Get request to fetch list of subjects user is enrolled in.
- /api/users/assignments/:userId/:subjectId :- Get request to fetch all assignments for that user and particular subject.


### Challenges

- Designing Schema and sub-schemas, deciding key entities was really a challenging stuff as whole architecture was based on it.
- Establishing mapping between assignment, submissions and users was bit complex as all three entities were dependent on each other.
- Designing query for creating and submitting assignment and viewing submissions was challenging because of nested dependencies of entities.
- Deploying mern on heroku & netlify.


