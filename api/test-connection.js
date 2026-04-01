require("dotenv").config();
const mongoose = require("mongoose");

const uri = process.env.MONGODB_URI;

console.log("=== MongoDB Connection Debug ===");
console.log("URI (masked):", uri.replace(/:([^@]+)@/, ':****@'));

// Parse out the components
const match = uri.match(/mongodb\+srv:\/\/([^:]+):([^@]+)@([^/]+)\/(.*)/);
if (match) {
  console.log("Username:", match[1]);
  console.log("Password length:", match[2].length);
  console.log("Host:", match[3]);
  console.log("Database:", match[4].split('?')[0]);
} else {
  console.log("ERROR: Could not parse URI format!");
}

console.log("\nAttempting connection...\n");

mongoose.connect(uri, { serverSelectionTimeoutMS: 10000 })
  .then(() => {
    console.log("SUCCESS! MongoDB connected.");
    process.exit(0);
  })
  .catch((err) => {
    console.log("FAILED:", err.message);
    console.log("Error code:", err.code);
    console.log("Error codeName:", err.codeName);
    
    if (err.message.includes('Authentication failed')) {
      console.log("\n--- DIAGNOSIS ---");
      console.log("The host/cluster IS reachable, but credentials are wrong.");
      console.log("The username in .env is:", match ? match[1] : "unknown");
      console.log("Make sure this EXACT username exists in Atlas > Database Access.");
      console.log("Double check: is it 'kishore_adminn' (2 n's) or 'kishore_admin' (1 n)?");
    } else if (err.message.includes('ENOTFOUND') || err.message.includes('getaddrinfo')) {
      console.log("\n--- DIAGNOSIS ---");
      console.log("Cannot reach the cluster. Either:");
      console.log("1. The cluster hostname is wrong");
      console.log("2. No internet connection");
    } else if (err.message.includes('timed out')) {
      console.log("\n--- DIAGNOSIS ---");
      console.log("Connection timed out. Your IP is likely NOT whitelisted in Atlas.");
    }
    
    process.exit(1);
  });
