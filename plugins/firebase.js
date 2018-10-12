import firebase from 'firebase'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyCxYgUutoQeZ7vUT5yXhif8UMtpyp62TMo",
    authDomain: "slack-wannabe.firebaseapp.com",
    databaseURL: "https://slack-wannabe.firebaseio.com",
    projectId: "slack-wannabe",
    storageBucket: "slack-wannabe.appspot.com",
    messagingSenderId: "1054840290593"
  })
}

export default firebase
