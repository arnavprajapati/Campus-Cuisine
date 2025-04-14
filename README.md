# 📚 Online Library Management System (LibraryHub)

## 🌟 Overview

The **Online Library Management System (LibraryHub)** is a comprehensive platform designed to streamline library operations. It is divided into two modules:

- **👨‍🎓 Student Module**: Students can register, view issued books, and manage their profiles.
- **👩‍💼 Admin Module**: Admins can manage books, authors, categories, and track issued books.

This system ensures a seamless and efficient library management experience for all users.

## 🌐 Online Demo

Experience the **Online Library Management System (LibraryHub)** live by visiting the following link:

[🔗 Online Demo](https://library-hub-3ce5.onrender.com/)

## Explore the features and functionality of the platform in real-time.

## 🚀 Features

### 🖥️ Admin Features:

- 📊 **Admin Dashboard**: View statistics on books, authors, and issued books.
- 📂 **Category Management**: Add, update, and delete book categories.
- 📂 **Author Management**: Add, update, and delete authors.
- 📂 **Book Management**: Add, update, and delete books.
- 📋 **Issue & Return Books**: Issue books to students and update details when books are returned.
- 🔍 **Search Students**: Search students using their Student ID and view detailed profiles.
- 🔑 **Password Management**: Change the admin password.

### 👨‍🎓 Student Features:

- 📝 **Registration**: Students can register and receive a unique Student ID.
- 📊 **Student Dashboard**: View issued books and their return dates.
- 🛠️ **Profile Management**: Update personal details for a personalized experience.
- 🔑 **Password Management**: Securely change and recover passwords.
- 📧 **Email Notifications**: Receive an email upon successful signup.

---

## 🛠️ Tech Stack

The system is built using the following technologies:

- **Backend**: PHP
- **Frontend**: HTML, JavaScript, Tailwind CSS
- **Database**: MySQL
- **Containerization**: Docker
- **Database Management**: phpMyAdmin

This robust tech stack ensures scalability, maintainability, and ease of deployment.

---

## 🖥️ Running Locally

Follow these steps to set up and run the project locally:

### Clone the Repository

Clone the project to your local machine:

```bash
git clone https://gitlab.com/a0v0/library-hub.git
cd library-hub
```

### Set Up Docker

### Configure Environment Variables

Copy the `.env.example` file to `.env`:

```bash
cp .env.example .env
```

Update the `.env` file with your specific configuration if needed. Ensure Docker is installed and running on your system. Then, build and start the containers:

```
docker-compose up --build
```

### Access the Application

- Open your browser and navigate to:
  - Application: http://localhost:8090
  - phpMyAdmin: http://localhost:8081 (default credentials are set in the docker-compose.yml file) (username: root, password: root).

### Initialize the Database

Import the provided SQL file into the MySQL database:

- Use phpMyAdmin or the MySQL CLI to import the [SQL file](sql.sql) in the root directory.

### Start Using the System

- Log in as an Admin or register as a Student to explore the features.

## 🤝 Contributing

Contributions are welcome! Follow these steps to contribute:

1. Fork the repository.
1. Create a new branch: git checkout -b feature-name.
1. Commit your changes: git commit -m "Add feature".
1. Push to the branch: git push origin feature-name.
1. Open a pull request.
