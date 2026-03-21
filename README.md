Navy HRM (MERN)
A role-based Human Resource Management system tailored for a naval ship. Supports Admin, CO, XO, GO, RO, EO, LO, SO, MO, DO and Sailor users, with department and division assignments, approvals, and dashboards.
Tech
Backend: Node.js, Express, MongoDB (Mongoose), JWT, bcrypt
Frontend: React (Vite), React Router, Axios
Quick Start
1) Backend
```bash
cd backend
cp .env.example .env
# Edit .env to set MONGO_URI and JWT_SECRET
npm install
npm run dev   # for development (nodemon)
# or
npm start
```
Seed sample data:
```bash
npm run seed
```
2) Frontend
```bash
cd ../frontend
npm install
npm run dev   # open the printed local URL
```
Default Credentials (after seeding)
Admin: serviceNo `ADM0001`, email `admin@navy.mil`, password `Password@123`
CO: serviceNo `CO0001`, email `co@navy.mil`, password `Password@123`
XO: email `xo@navy.mil`, password `Password@123`
RO: email `ro@navy.mil`, password `Password@123`
GO: email `go@navy.mil`, password `Password@123`
EO: email `eo@navy.mil`, password `Password@123`
LO: email `lo@navy.mil`, password `Password@123`
SO: email `so@navy.mil`, password `Password@123`
MO: email `mo@navy.mil`, password `Password@123`
DO: email `do-alpha@navy.mil`, password `Password@123`
Sample Sailor: email `sr1@navy.mil`, password `Password@123`
Notes
Officers may have multiple roles.
New officer signups wait for XO approval + role assignment.
New sailor signups wait for RO approval + Sailor role assignment.
RO assigns department for sailors.
GO assigns division for sailors and sets a DO for each division.
Admin and CO have full access.