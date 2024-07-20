const jsonServer = require('json-server');
const admin = require('firebase-admin');
const path = require('path');

// Run in Local
// Path to your service account key file
/*  const serviceAccount = require(path.join(__dirname, '../config', 'api-project-change-file-name.json')); // Replace with your actual service account key file
    admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://path-to-database.firebaseio.com/' // Replace with your actual Firebase Realtime Database URL
    });
*/

// Run in Vercel with Environment Variables
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  }),
  databaseURL: 'https://path-to-database.firebaseio.com/' // Replace with your actual Firebase Realtime Database URL
});
// Firebase Realtime Database
const db = admin.database();

const server = jsonServer.create();
const middlewares = jsonServer.defaults();

server.use(middlewares);

// Method to fetch data from Firebase
const fetchData = async () => {
  const ref = db.ref('/');
  try {
    const snapshot = await ref.once('value');
    return snapshot.val() || {};
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

// Method to save data to Firebase
const saveData = async (data) => {
  const ref = db.ref('/');
  try {
    await ref.set(data);
    console.log('Data saved successfully');
  } catch (error) {
    console.error('Error saving data:', error);
    throw error;
  }
};

// Middleware to save changes to Firebase when a POST, PUT, PATCH or DELETE request is made
const firebaseSyncMiddleware = (router) => (req, res, next) => {
  res.on('finish', async () => {

    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)) {
      try {
        const data = router.db.getState(); // Get the latest state from json-server
        await saveData(data); 
      } catch (error) {
        console.error('Error updating data in Firebase:', error);
      }
    }
    else {
        //fetch data from firebase
        const data = await fetchData();
        router.db.setState(data);
    }
  });
  next(); // Continue to JSON Server router
};


const startServer = async () => {
  try {
    const data = await fetchData();
    const router = jsonServer.router(data);

    // Use the firebase middleware
    server.use(firebaseSyncMiddleware(router));

    server.use(router);

    const PORT = process.env.PORT || 3000;
    server.listen(PORT, () => {
      console.log(`JSON Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
};

startServer();

module.exports = server;
