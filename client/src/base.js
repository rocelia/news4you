import Rebase from 're-base'

import * as firebase from 'firebase'
var config = {
  apiKey: "AIzaSyBYifcWRrgWkG1AsyNiozuMn56FZJelBPc",
  authDomain: "news4u-bca20.firebaseapp.com",
  databaseURL: "https://news4u-bca20.firebaseio.com",
  projectId: "news4u-bca20",
  storageBucket: "news4u-bca20.appspot.com",
  messagingSenderId: "20066424131"
};

// firebase.initializeApp(config)

const firebaseApp = firebase.initializeApp(config)
const databaseBase = Rebase.createClass(firebaseApp.database())

export { databaseBase, firebase }
