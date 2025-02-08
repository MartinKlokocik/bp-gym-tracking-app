# BP Gym Tracking App

This is a bachelor's project for tracking progress in the gym. The app uses a **Next.js frontend**, a **Node.js backend**, and a **PostgreSQL database**. The backend is built with **GraphQL** and **Prisma ORM** for database management. The frontend leverages **Apollo Client** and **Tailwind CSS** for efficient styling and GraphQL queries.

---

## **Requirements**
Ensure you have the following installed:

- **Node.js v22.11.0**
  ```bash
  node -v  # Should print v22.11.0
  ```
  If not, run:
  
  using Mac:
  ```bash
  nvm install 22.11.0
  ```
  Optional
  ```bash
  nvm alias default 22.11.0
  ```

  using Windows:
  download installer

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

## **Frontend Setup**

The frontend is built using **Next.js**, **Apollo Client**, and **Tailwind CSS**.

### **Steps to Set Up the Frontend**

1. **Create a Next.js App:**
   ```bash
   npx create-next-app@latest my-app
   cd my-app
   ```

2. **Install Dependencies:**
   ```bash
   npm install graphql @apollo/client
   npm install -D tailwindcss postcss autoprefixer
   ```

3. **Initialize Tailwind CSS:**
   ```bash
   npx tailwindcss init
   ```

4. **Start the Development Server:**
   ```bash
   npm run dev
   ```

---

## **Backend Setup**

The backend is built with **Node.js**, **GraphQL**, and **Prisma ORM**.

### **Steps to Set Up the Backend**

1. **Initialize a Node.js Project:**
   ```bash
   mkdir backend
   cd backend
   npm init -y
   ```

2. **Install Dependencies:**
   ```bash
   npm install graphql apollo-server @prisma/client pg
   npm install ts-node-dev@latest typescript@latest @types/node --save-dev
   ```

3. **Initialize Prisma:**
   ```bash
   npx prisma init
   ```

   This creates a `prisma/schema.prisma` file where you define your database schema.

4. **Start the Development Server:**
   ```bash
   npm run dev
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

## **Project Stack and Usage**

### **Frontend Stack**
- **Next.js:** For building the React-based UI.
- **Apollo Client:** To fetch and manage GraphQL data.
- **Tailwind CSS:** For efficient and flexible styling.

### **Backend Stack**
- **Node.js:** The runtime environment.
- **Apollo Server:** To create the GraphQL API.
- **Prisma ORM:** For database migrations and queries.
- **PostgreSQL:** The relational database for persistent storage.

---

## **Tips for Development**
- **Database Configuration:**
  Ensure your `.env` file in the backend contains the correct database URL:
  ```dotenv
  DATABASE_URL="postgresql://user:password@localhost:5432/database_name"
  ```

- **Debugging Prisma:**
  Add logging to Prisma Client for better debugging:
  ```typescript
  const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  });
  ```

- **API Testing:**
  Use tools like [Postman](https://www.postman.com/) or [Insomnia](https://insomnia.rest/) to test your GraphQL API.

---