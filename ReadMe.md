1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information 
  - username: `labber` 
  - password: `labber` 
  - database: `final_project`
3. Install dependencies: `npm i`
4. Reset database: `npm run db:reset`
  - Check the db folder to see what gets created and seeded in the SDB
7. Run the server: `npm run dev`
  - Note: Restart your server after any change
8. Visit `http://localhost:5000/`