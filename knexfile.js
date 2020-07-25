const pgConnection = process.env.DATABASE_URL;

module.exports = {
  development: {
    client: "pg",
    connection: {
      host: "localhost",
      database: "comake",
      user: "postgres",
      password: "Noble15!!",
    },
    migrations: {
      directory: "./database/migrations", // you do not need to create this directory, when you run the knex migrate command it will initialize this directory for you
    },
    seeds: {
      directory: "./database/seeds", // you do not need to create this directory, when you run the knex migrate command it will initialize this directory for you
    },
  },

  testing: {
    client: "pg",
    connection: pgConnection,
    migrations: {
      directory: "./database/migrations", // you do not need to create this directory, when you run the knex migrate command it will initialize this directory for you
    },
    seeds: {
      directory: "./database/seeds", // you do not need to create this directory, when you run the knex migrate command it will initialize this directory for you
    },
    pool: {
      min: 2,
      max: 10,
    },
  },

  production: {
    client: "pg",
    connection: pgConnection,
    migrations: {
      directory: "./database/migrations", // you do not need to create this directory, when you run the knex migrate command it will initialize this directory for you
    },
    seeds: {
      directory: "./database/seeds", // you do not need to create this directory, when you run the knex migrate command it will initialize this directory for you
    },
  },
};
