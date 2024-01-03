const { initializeApp } =  require("firebase/app");
const { 
    getFirestore,
    collection, 
    addDoc,
    getDocs,
    query,
    where
} = require("firebase/firestore");

require("dotenv").config();

const {
    API_KEY,
    AUTH_DOMAIN,
    PROJECT_ID,
    STORAGE_BUCKET,
    MESSAGING_SENDER_ID,
    APP_ID,
    MEASUREMENT_ID
} = process.env;

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID,
  databaseURL: "https://shib-ef3ea-default-rtdb.firebaseio.com/"
};

// const analytics = getAnalytics(app);

let app;
let db;

const initializeFirebaseApp = () => {
    try {
        app = initializeApp(firebaseConfig);
        db = getFirestore(app);
        return app;
    } catch (e) {
        res.json({ title: "Error", message: e.message});
    }
}

// Add new data
const uploadProcessedData = async (collectionName, data) => {
    try {
        const document = await addDoc(collection(db, collectionName), data);
        
        return document.id;
    } catch(err) {
        throw new Error(err);
    }
}

// Get All Data
const getData = async (collectionName) => {
    try {
        const querySnapshot = await getDocs(collection(db, collectionName));

        return querySnapshot.docs.map(doc => doc.data());
    } catch(err) {
        throw new Error(err);
    }
}

// Get single data
const getSingleData = async (collectionName, condition, param) => {
    try {
        const collectionRef = collection(db, collectionName);
        const q = query(collectionRef, where(condition, "==", param));

        const querySnapshot = await getDocs(q);

        return querySnapshot.docs.map(doc => doc.data());
    } catch(err) {
        throw new Error(err);
    }
} 

const getFirebaseApp = () => app;

module.exports = { 
    initializeFirebaseApp, 
    getFirebaseApp,
    uploadProcessedData,
    getData,
    getSingleData
};