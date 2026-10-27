# Kanban Task Management App

Kanban Task Management App is a web-based application for managing tasks using the Kanban method.

## Demo

You can view the live website [here](https://lextrnd.github.io/kanban-task-management-app/).

## Technologies Used

- Next.js / React
- Apollo Client
- GraphQL
- SCSS

The backend lives in a separate repo, [kanban-api](https://github.com/ayreese/kanban-api)
(Apollo Server, Nexus, Prisma, Postgres).

## Features

- Create, edit and delete boards and their columns
- Create, edit and delete tasks, with subtasks you can tick off
- Move tasks between columns
- Sign up and log in; each user only sees their own boards

## Run locally

1. Start the API first: follow the steps in the
   [kanban-api README](https://github.com/ayreese/kanban-api#run-locally).
   It runs at `http://localhost:4000`.
2. In this project:

   ```bash
   cp .env.example .env.local   # only needed if the API isn't on localhost:4000
   npm install
   npm run dev
   ```

3. Open `http://localhost:3000`.

## Deploy

Deploy the API first, then deploy this app (e.g. to Vercel) with
`NEXT_PUBLIC_API_URL` set to the API's public URL.

## Contributing

If you would like to contribute to the development of this application, feel free to fork the repository and submit a pull request with your changes.

## License

This project is licensed under the [MIT License](https://github.com/LexTRND/kanban-task-management-app/blob/main/LICENSE).
