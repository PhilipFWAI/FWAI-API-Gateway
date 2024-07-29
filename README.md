# FWAI API GATEWAY

This Gateway provides a single entry point for managing all inbound and outbound Third-Party API requests.

## KEY FEATURES GATEWAY PERFORM:

1. Load Balancing

2. Security

3. Rate Limiting Checking

4. Caching Checking

5. Logging and Monitoring

6. Authentication Key

7. Request Validation

8. Transform Requests

9. Data Storing

10. Routing Requests

11. Transform Responses

12. Errors Handling

## COMPLETED INTEGRATIONS:

### STRIPE

1. Create Plan/Product

2. List Plans/Products

3. List Subscriptions

4. Checkout Session

### GOOGLE

#### Google Calendar

1. Get Access Token

2. Refresh Access Token

3. List Calendars

4. Create Calendar Event

5. List Calendar Events

6. Get Calendar Event

7. Update Calendar Event

8. Cancel Calendar Event


#### Google Spreadsheets

1. List Spread Sheets

2. Get Spread Sheet

3. Get Spread Sheet Data

## INSTALLATION AND DB SETUP

1. Clone the repository: ```git clone git@github.com:PhilipFWAI/FWAI-API-Gateway.git```
2. Node Version ```21.5.0```.
3. Setup Database:

- Run this command ```npx sequelize init```.
- Run this script ```npm run deleteAllTables```.
- Run this script ```npm run createAllTables```.
- Run this script ```npm run createAllSeeds```.

4. Install dependencies:```npm install``` or ```yarn add```
5. Copy `.env.example` to `.env` and add values to all variables.
6. Start the server, to test gateway performance:```npm run dev```