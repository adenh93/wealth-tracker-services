import { Sequelize } from "sequelize"

const sequelize = new Sequelize(
  "wealth_tracker",
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
  {
    host: "db",
    dialect: "postgres",
  }
)

export default sequelize
