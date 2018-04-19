import firebase from 'firebase/app';
import firestore from 'firebase/firestore';
import auth from 'firebase/auth';

export default function initFireBase(options){
  const app = firebase.initializeApp(options);
  return {
    app: app,
    auth : app.auth(),
    store: app.firestore()
  };
}
