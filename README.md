# Netflix Clone

A full-stack Netflix-inspired web application built with **Next.js**. The project focuses on recreating a modern streaming platform experience, including authentication, movie browsing, and a responsive user interface.

> **Note:** This project is created for educational and portfolio purposes and is not affiliated with Netflix.

## 🚀 Features

* User authentication and authorization
* Secure login functionality
* Browse movies and TV shows
* Responsive Netflix-inspired user interface
* Movie banners and categorized content
* Dynamic movie details
* Continue Watching functionality
* Personalized recommendations
* Protected routes
* Modern and responsive design

## 🛠️ Tech Stack

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS

### Backend

* Next.js API Routes
* NextAuth.js

### Database

* MongoDB

### Authentication

* NextAuth.js
* Credentials Authentication

### Other Tools

* Git
* GitHub
* Vercel

## 📂 Project Structure

```text
netflix-clone/
│
├── app/
│   ├── api/
│   │   └── auth/
│   ├── login/
│   └── page.tsx
│
├── components/
│   ├── Navbar.tsx
│   ├── MovieCard.tsx
│   ├── Banner.tsx
│   └── ...
│
├── lib/
│   └── ...
│
├── models/
│   └── ...
│
├── public/
│   └── ...
│
├── types/
│   └── ...
│
├── .env.local
├── package.json
└── README.md
```

## ⚙️ Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
```

### 2. Navigate to the project directory

```bash
cd YOUR_REPOSITORY
```

### 3. Install dependencies

```bash
npm install
```

### 4. Create an environment file

Create a `.env.local` file in the root directory and add the required environment variables:

```env
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000
MONGODB_URI=your_mongodb_connection_string
```

### 5. Run the development server

```bash
npm run dev
```

Open:

`http://localhost:3000`

in your browser.

## 🔐 Authentication

The application uses **NextAuth.js** for authentication.

The authentication system handles:

* User login
* Session management
* Protected routes
* Authentication providers

## 🎬 Future Improvements

* [ ] Continue Watching functionality
* [ ] Personalized movie recommendations
* [ ] User profiles
* [ ] Movie search
* [ ] Watchlist / My List
* [ ] Video player integration
* [ ] Netflix subscription payment integration using a custom UPI payment simulator
* [ ] Improved recommendation system

## 📸 Screenshots

## 🎯 Purpose of the Project

This project was built to improve my understanding of:

* Next.js application development
* React and component-based architecture
* Authentication using NextAuth.js
* Backend development using Next.js API routes
* Database integration
* Full-stack application development
* Building production-style web applications

## 🧑‍💻 Author

**Vedant Girme**

GitHub: https://github.com/ViChilly77

## ⚠️ Disclaimer

This project is created strictly for **educational and portfolio purposes**. Netflix and its related branding, logos, and content belong to their respective owners. This project is not intended for commercial use.

## ⭐ Support

If you like this project, consider giving the repository a ⭐ on GitHub!
