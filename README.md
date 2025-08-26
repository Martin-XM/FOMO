FOMO – Game Collection & Wishlist Tracker

FOMO is a web application that helps collectors keep track of their video game collections and wishlists.
It provides an easy way to add games you want to track, mark them as purchased, and manage your collection in one place.

Features

- Authentication with Firebase (secure access with email & password)

- Missing Games list – add games you want to track with name, link, price, and notes

- Purchased Games list – move games to your collection once you buy them

- Realtime database powered by Firebase Realtime Database

- Modern UI built with React + Tailwind CSS

- Responsive design (works on desktop and mobile)

Create .env file in the project root with your Firebase credentials:

VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_URL=https://your_project_id-default-rtdb.europe-west1.firebasedatabase.app/
