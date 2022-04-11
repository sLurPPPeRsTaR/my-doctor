// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBJHd2gbM8zUoSARwbQ1stHt9tTRf0-g8U',
  authDomain: 'mydoctor-96cbb.firebaseapp.com',
  projectId: 'mydoctor-96cbb',
  storageBucket: 'mydoctor-96cbb.appspot.com',
  messagingSenderId: '735470808106',
  appId: '1:735470808106:web:2b3583ee2926944fa6a753',
  databaseURL:
    'https://mydoctor-96cbb-default-rtdb.asia-southeast1.firebasedatabase.app/',
};

// Initialize Firebase
export const Fire = initializeApp(firebaseConfig);
