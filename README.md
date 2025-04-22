# BP Gym Tracking App

This is a bachelor's project for tracking progress in the gym. The app uses a **Next.js frontend**, a **Node.js backend**, and a **PostgreSQL database**. The backend is built with **GraphQL** and **Prisma ORM** for database management. The frontend leverages **Apollo Client** and **Tailwind CSS** for efficient styling and GraphQL queries.

---

## **Requirements**
Ensure you have the following installed:

- **Node.js v22.11.0**
  ```bash
  node -v  # Should print v22.11.0
  ```
  If not, run inside '/client-next' and '/node-server'
  ```bash
  nvm install
  ```
  ```bash
  nvm use
  ```

- **NPM v10.9.0**
  ```bash
  npm -v  # Should print 10.9.0
  ```
  if not, run:

  using Windows:
  ```bash
  npm install -g npm@10.9.1
  ```

- **NVM (Node Version Manager)**
  ```bash
  nvm --version  # Should print 0.39.7
  ```
  if not, run:

  using Windows:
  download installer

- **PostgreSQL**
  - Mac:
    ```bash
    brew install postgresql
    ```
    ```bash
    brew services start postgresql
    ```
    ```bash
    createdb gymtrackdb
    ```
    You can also download PostgreSQL from the official site to have pg admin 4 graphical IDE.
  - Windows:
    Download and install PostgreSQL from the official site.

  Verify installation:
  ```bash
  psql --version
  ```

---

## **Using Prisma ORM**

Prisma is used to manage the database. Here's how to work with Prisma:

### **Database Migrations**

1. **Define Your Schema:**
   Edit the `prisma/schema.prisma` file to define your database tables and relationships. Example:
   ```prisma
   model User {
     id    Int     @id @default(autoincrement())
     name  String
     email String  @unique
   }
   ```

2. **Run a Migration:**
   To create/update the database schema:
   ```bash
   npx prisma migrate dev --name init
   ```

3. **Generate the Prisma Client:**
   After every schema change, regenerate the Prisma Client:
   ```bash
   npx prisma generate
   ```

4. **View the Database in Prisma Studio:**
   Open a visual interface to interact with your database:
   ```bash
   npx prisma studio
   ```

5. **Reset the Database:**
   Reset the database to the initial state:
   ```bash
   npx prisma migrate reset
   ```
   Seed the database with example data:
   ```bash
   npm run seed
   ```

---

## **Running the App**

### **Frontend:**
1. Navigate to the frontend directory:
   ```bash
   cd next-client
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open the app in the browser:
   ```
   http://localhost:3000
   ```

### **Backend:**
1. Navigate to the backend directory:
   ```bash
   cd node-server
   ```

2. Start the backend server:
   ```bash
   npm run dev
   ```

3. Test the GraphQL API:
   Visit:
   ```
   http://localhost:4000/graphql
   ```

   Example query:
   ```graphql
   query {
     users {
       id
       name
       email
     }
   }
   ```

---

## **Tips for Development**
- **Database Configuration:**
  Ensure your `.env` file in the backend contains the correct database URL:
  ```dotenv
  DATABASE_URL="postgresql://user:password@localhost:5432/database_name"
  ```

## **Running scripts from terminal**

```bash
cd node-server
npx ts-node 'path'
```

---