// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAn6ziwuTUMKlwB2lkINMBEo44rOtoQIcw',
  authDomain: 'jira-clone-563c4.firebaseapp.com',
  projectId: 'jira-clone-563c4',
  storageBucket: 'jira-clone-563c4.appspot.com',
  messagingSenderId: '96715772654',
  appId: '1:96715772654:web:861f4fb65a9f72d6ab19ff',
  measurementId: 'G-S3GTW5LCMJ',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
