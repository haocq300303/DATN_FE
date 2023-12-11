// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDpm7wI5-z2BmSQ8Q7nzfA2Dw3uFOMQKpE',
  authDomain: 'datn-93e6c.firebaseapp.com',
  projectId: 'datn-93e6c',
  storageBucket: 'datn-93e6c.appspot.com',
  messagingSenderId: '25165623031',
  appId: '1:25165623031:web:d3bcd7a201d56a2677adf2',
  measurementId: 'G-241T89XQVL',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
