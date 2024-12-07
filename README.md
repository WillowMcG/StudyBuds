# Study Buds
StudyBuds is a website that encourages young children to study via positive reinforcement. It grows virtual plants to reward children for answering questions correctly, as well as highlighting the top performing students in a class on the class leaderboard.
## Local/Manual Installation Instructions
1. Clone Github Repository
2. Replace API Keys (see below)
3. Install Node.js
4. Install Docker
   - If Issues, Install Dependencies:
     - `npm i react-scripts` in *frontend*
     - `npm install react-router-dom` in *frontend*
     - `run npm i dotenv` in *backend*
     - `npm install seedrandom` in *backend*
5. Create Docker Container:
   - `docker-compose build --no-cache` in *main folder*
   - `docker-compose up` in *main folder*
6. Run `npm start` in *frontend*
7. Go to http://localhost:3000
