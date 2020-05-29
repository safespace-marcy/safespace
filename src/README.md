Creating a new migration: `npx knex migrate:make <name>`

Example Input: `npx knex migrate:make create_users_table`

Output: `Created Migration: /home/enmanuel/safespace/src/db/migrations/20200519104957_create_users_table.js`
Directory for migrations specified in `knexfile.js`

Seeds are run in alphabetical order with `npx knex seed:run` and are created with `npx knex seed:make <name>`
