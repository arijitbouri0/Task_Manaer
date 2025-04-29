
# Task Manager Application


This is a Task Manager application built with React, Node.js, Express, MongoDB . It allows users to add task and update delete seamlessly.


## Demo
Live Link:
https://task-manaer-frontend.vercel.app

### Guest Login Credentials
To explore the application without creating an account, you can use the following guest login credentials:

#### Guest User 1
```bash
 email: example@gmail.com
 Password: 12345678
```
Simply enter these credentials on the login page to access the application as a guest.

## Features


## Tech Stack

- Frontend: React ,TailwindCss(Client)
- Backend: Node.js, Express
- Database: MongoDB 
- Hosting: Vercal


## Run Locally

### Setup Backend

Clone the project

```bash
  git clone https://github.com/arijitbouri0/Task_Manaer

```

1.Navigate to Server Directory
```bash
  cd Server
```

2.Install dependencies
```bash
  npm install
```

3.Create a .env file and add:
```bash
  PORT=5000
  MONGODB_URI='your-mongodb-connection-string'
  JWT_SECRET='your-secret-key'
  CLIENT_URL='your-url'
```

4.Start the Backend Server
```bash
  npm run dev
```
### Setup Frontend

1.Navigate to the client folder:
```bash
cd ../client
```

3.Create a .env file and add:
```bash
BACKEND_SERVER='http://localhost:8000'
```

Install frontend dependencies:
```bash
npm install
```

Run the React App
```
npm run dev
```
## License

[MIT](https://choosealicense.com/licenses/mit/)


## Support

For support, email arijitbouri0@gmail.com .

