# Project Name : TweetX

TweetX A simple social media application allowing users to sign up, post short messages, follow other users, and view a personalized feed.

## Technologies Used

- React
- Firebase (Authentication and Firestore for backend)
- Tailwind CSS
- UUID
- React Router DOM

## Getting Started

### Prerequisites

Make sure you have Node.js and npm installed on your machine.

### Installation

1. **Clone the repository**

    ```bash
    git clone https://github.com/adityananu/TweetX.git
    ```

2. **Install dependencies**

    ```cd tweetx
    npm install
    ```

3. **Start the development server**

    ```bash
    npm run dev
    ```

    Visit [http://localhost:3000](http://localhost:3000) to view the application in your browser.

## Project Structure

- `public`: Static assets and HTML template
- `src`:
  - `components`: React components
    - `Feed.js`: Component for displaying user posts
    - `Users.js`: Component for listing users
    - `Profile.js`: Component for user profile, including posts, followers, and following
    - `Header.js`: Header component with navigation
  - `pages`: React components representing different pages
    - `Home.js`: Home page with main content
    - `Login.js`: Login page
    - `Signup.js`: Signup page
  - `context`: React context for user authentication
  - `firebase`: Firebase configuration and initialization
  - `utils`: Utility functions
  - `App.js`: Main application component
  - `index.js`: Entry point of the application

## Features

1. **User Authentication**
   - Users can sign up and log in to access the application.

2. **Posting**
   - Users can post short text messages similar to Twitter.

3. **Feed**
   - Users have a personalized feed showing posts of other users.

4. **User Profile**
   - Users have profiles displaying their posts, followers, and following.

5. **Follow**
   - Users can follow other users.

6. **Logout**
   - Users can log out of the application.

## Deployment

The application is deployed and hosted on [Vercel](https://vercel.com/).

[Live Demo](https://your-live-demo-url.netlify.app/)

## Created(ME)

- Aditya : Personal Portfolio - [https://aditya-fawn.vercel.app/]

## suggestion/feedback

feel free to give suggestion and feedback to the application which was in development way and if have any sugestion email: [adityananu157@gmail.com]
