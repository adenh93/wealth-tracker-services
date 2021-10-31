export default {
  client: "postgresql",
  connection: {
    host: "db",
    database: "wealth_tracker",
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
  },
}
