"use client";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useEffect } from "react";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";

export default function FB0529() {

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBngjJ-2pyuXsppxmOik_DXlwnTIfnQi8s",
    authDomain: "claw-machine-53f50.firebaseapp.com",
    projectId: "claw-machine-53f50",
    storageBucket: "claw-machine-53f50.firebasestorage.app",
    messagingSenderId: "346805704103",
    appId: "1:346805704103:web:d9280d5d98e870f3029282",
    databaseURL: "https://claw-machine-53f50-default-rtdb.asia-southeast1.firebasedatabase.app/"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);
  const dbRef = ref(database, "/");
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  useEffect(()=>{
    onValue(dbRef, (snapshot) => {
      console.log(snapshot.val());
    });

    const userRef = ref(database, "/accounts/001/");
    set(userRef, {
      name: "Bob",
      points: 100
    });

  },[]);

  const addNewAccount = () => {
    console.log("click add new account");
    const accountRef = ref(database, "/accounts");
    push(accountRef, {
      name: "Bob",
      type: "user",
      points: 100
    });
  }

  const login = () => {
    console.log("click login");
    signInWithPopup(auth, provider).then((result) => {
      console.log(result);
      console.log(result.user.uid);
      console.log(result.user.displayName);

      const uid = result.user.uid;
      const name = result.user.displayName;
      const accountRef = ref(database, "/accounts/" + uid);
      
      console.log(accountRef);
      if(!accountRef){
        console.log("無此帳號，新增一個");
        //無此帳號，新增一個
        push(accountRef, {
          name: name,
          type: "user",
          points: 100,
          uid: uid
        });
      }
    });
  }

  return (
    <>
      FB0529
      <div onClick={addNewAccount} className="border-2 px-4 py-1 inline-block">
        Add new accounts
      </div>
      <div onClick={login} className="border-2 px-4 py-1 inline-block">
        Login with Google
      </div>
    </>

  );
}
