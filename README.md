# PhilBoilerPlate Server

Backend API boilerplate built with Node.js, Express, TypeScript, MongoDB, and Mongoose.

## Tech Stack

- Node.js
- Express
- TypeScript
- MongoDB
- Mongoose
- dotenv
- CORS
- tsx

## Project Structure

```text
src/
├── models/
│   ├── User.ts
│   └── AuthToken.ts
└── server.ts
```

## Getting Started

Install dependencies:

```bash
npm install
```

Create a `.env` file in the project root:

```env
PORT=5000
DATABASE_URL=your_mongodb_connection_string
```

Start the development server:

```bash
npm run dev
```

Build the project:

```bash
npm run build
```

Run the compiled production build:

```bash
npm start
```

## Data Models

### User

Stores user account information including:

- Email
- Username
- Password hash
- Created and updated timestamps

### AuthToken

Stores authentication token information including:

- Associated user ID
- Token hash
- Expiration date
- Revoked status
- Created and updated timestamps

## Scripts

```bash
npm run dev
npm run build
npm start
```

## Environment Variables

The following environment variables are required:

```env
PORT=
DATABASE_URL=
```

Do not commit the `.env` file to source control.

## Status

Current implementation includes:

- Express server setup
- MongoDB connection with Mongoose
- User model
- AuthToken model