# Node.js GraphQL Backend

This is the GraphQL backend server for the BP Gym Tracking App.

For complete setup instructions, architecture details, and project information, see the [main README](../../README.md) in the root directory.

## Quick Start

```bash
npm install
cp .env.example .env    # Fill in DB credentials and OpenAI API key
npx prisma migrate dev  # Initialize database
npm run seed           # Optional: seed with sample data
npm run dev            # Runs at http://localhost:4000
```

GraphQL Playground available at: http://localhost:4000/graphql
