# MongoDB Setup Instructions

## Option 1: Install MongoDB locally (Recommended for development)

1. Download MongoDB Community Server from: https://www.mongodb.com/try/download/community
2. Install with default settings
3. Start MongoDB service:
   ```bash
   # Windows
   net start MongoDB
   
   # Or run manually
   "C:\Program Files\MongoDB\Server\7.0\bin\mongod.exe" --dbpath="C:\data\db"
   ```

4. Your current .env is already configured for local MongoDB:
   ```
   MONGODB_URI=mongodb://localhost:27017/schoolmanagement
   ```

## Option 2: Fix MongoDB Atlas Connection

1. Go to https://cloud.mongodb.com/
2. Check if your cluster is active
3. Go to Network Access → Add IP Address → Add your current IP
4. Get correct connection string from Connect → Drivers
5. Update .env with the new URI

## Option 3: Use MongoDB Atlas with different cluster

If the current cluster has issues:
1. Create a new free cluster on MongoDB Atlas
2. Get connection string
3. Update .env with new URI

## Quick Test
After setup, test connection:
```bash
cd api
npm start
```
