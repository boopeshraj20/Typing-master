// Firebase (compat) initializer — index.html loads the compat SDKs (firebase-app-compat.js, etc.)
// Remove ES module imports because the site uses the compat global `firebase` loaded via <script> tags.
// Firebase config (keep your existing values)
const firebaseConfig = {
  apiKey: "AIzaSyBXTjx1YZvVcwBQMId6J1RDgc6wmsCJpfY",
  authDomain: "typing-speed-test-app-cd619.firebaseapp.com",
  projectId: "typing-speed-test-app-cd619",
  storageBucket: "typing-speed-test-app-cd619.firebasestorage.app",
  messagingSenderId: "1026603882997",
  appId: "1:1026603882997:web:a613d5405771e55954e8bc",
  measurementId: "G-EQGGCLJX1C"
};

// Initialize Firebase using the compat global (index.html loads the compat scripts)
if (!window.firebase) {
  console.error("Firebase compat SDK not loaded. Make sure firebase-app-compat.js is included before firebase-config.js");
} else {
  try {
    if (!firebase.apps || !firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    // Expose commonly used services for other scripts
    window._firebaseApp = firebase.app();
    window._firebaseAuth = firebase.auth();
    window._firebaseDb = firebase.firestore();
    if (firebase.analytics) {
      try {
        window._firebaseAnalytics = firebase.analytics();
      } catch (e) {
        console.warn("Firebase analytics init failed:", e);
      }
    }
  } catch (err) {
    console.error("Firebase initialization error:", err);
  }
}