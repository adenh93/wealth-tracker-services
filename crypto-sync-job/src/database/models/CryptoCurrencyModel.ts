import { DataTypes, Model } from "sequelize"
import sequelize from "../connection"

export interface CryptoCurrencyAttributes {
  id: number
  rank: number
  name: string
  symbol: string
}

export interface CryptoCurrencyHoldingOutput
  extends Required<CryptoCurrencyAttributes> {}

class CryptoCurrencyModel
  extends Model<CryptoCurrencyAttributes, CryptoCurrencyAttributes>
  implements CryptoCurrencyAttributes
{
  public id!: number
  public rank!: number
  public name!: string
  public symbol!: string
}

CryptoCurrencyModel.init(
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
  {
    sequelize,
    tableName: "cryptocurrency",
    freezeTableName: true,
    timestamps: false,
  }
)

export default CryptoCurrencyModel
