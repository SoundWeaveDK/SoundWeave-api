# Fastify Scripts

In the project directory, you can run:

### `npm run dev`

To start the app in dev mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run migrate`

Replicate the changes in the Prisma schema and generate a new migration.

### `npm run restdb`

Use prisma to rest your database.

# Docker Scripts

### `docker-compose up -d`

Builds, (re)creates, starts, and attaches to containers for a service.
Unless they are already running, this command also starts any linked services.

-d stands for "Detached mode: Run containers in the background".

Click this [https://docs.docker.com/engine/reference/commandline/compose_up/](link) to view the documentation.

### `docker-compose down`

Stop and remove containers and networks. If you wan't to remove volumes also use "-v".

Click this [https://docs.docker.com/engine/reference/commandline/compose_down/](link) to view the documentation.

### `docker ps`

List running containers. Use "-a" for a list of all running and not running containers in docker.

Click this [https://docs.docker.com/engine/reference/commandline/ps/](link) to view the documentation.
