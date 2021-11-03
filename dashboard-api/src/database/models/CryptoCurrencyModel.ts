import { DataTypes, Model, Optional } from "sequelize"
import sequelize from "../connection"

export interface CryptoCurrencyAttributes {
  id: number
  rank: number
  name: string
  symbol: string
}

export interface CryptoCurrencyCreationAttributes
  extends Optional<CryptoCurrencyAttributes, "id"> {}

export interface CryptoCurrencyInstance
  extends Model<CryptoCurrencyAttributes, CryptoCurrencyCreationAttributes> {}

const CryptoCurrencyModel = sequelize.define<CryptoCurrencyInstance>(
  "cryptocurrency",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      field: "id",
    },
    rank: {
      type: DataTypes.INTEGER,
      field: "rank",
    },
    name: {
      type: DataTypes.STRING,
      field: "name",
    },
    symbol: {
      type: DataTypes.STRING,
      field: "symbol",
    },
  },
  { freezeTableName: true, timestamps: false }
)

export default CryptoCurrencyModel
