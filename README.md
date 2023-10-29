## Setting up the project

Environment variables (.env)

```bash
# Database URL
DATABASE_URL="postgresql://postgres:PASSWORD@HOST:PORT/todo"
# Generated from Resend account
RESEND_API_KEY=""
# Cipher algorithm i.e: "aes-256-cbc"
ALGO=""
# Initiative Vector 16 characters long ** IV is depend on ALGO
IV=""
# 32 characters long password
COOKIE_KEY=""
# 16 characters long password
SECRET_KEY=""
# Cookie name
COOKIE_NAME=""
```

### Install Packages

```bash
npm i
```

### Create Database

```bash
CREATE DATABASE todo;
```

### Use this command to apply the changes to your database.

```bash
npx prisma migrate dev --name "name"
```

### Start the server

```bash
npm run build
npm start
```
