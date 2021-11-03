import { DataTypes, Model, Optional } from "sequelize"
import { CryptoCurrencyModel } from "."
import sequelize from "../connection"

export interface CryptoCurrencyHoldingAttributes {
  id: number
  cryptoCurrencyId: number
  price: number
  percentChange24h: number
  holdings: number
  netHoldingsValue: number
}

export interface CryptoCurrencyHoldingCreationAttributes
  extends Optional<CryptoCurrencyHoldingAttributes, "id"> {}

export interface CryptoCurrencyHoldingInstance
  extends Model<
    CryptoCurrencyHoldingAttributes,
    CryptoCurrencyHoldingCreationAttributes
  > {}

export interface CryptoCurrencyHoldingOutput
  extends Required<CryptoCurrencyHoldingAttributes> {}

const CryptoCurrencyHoldingModel =
  sequelize.define<CryptoCurrencyHoldingInstance>(
    "cryptocurrency_holding",
    {
      id: {
        type: DataTypes.INTEGER,
        field: "id",
        primaryKey: true,
        autoIncrement: true,
      },
      cryptoCurrencyId: {
        type: DataTypes.INTEGER,
        field: "cryptocurrency_id",
        references: {
          model: CryptoCurrencyModel,
          key: "id",
        },
      },
      price: {
        type: DataTypes.DOUBLE,
        field: "price",
      },
      percentChange24h: {
        type: DataTypes.DOUBLE,
        field: "percent_change_24h",
      },
      holdings: {
        type: DataTypes.DOUBLE,
        field: "holdings",
      },
      netHoldingsValue: {
        type: DataTypes.DOUBLE,
        field: "net_holdings_value",
      },
    },
    { freezeTableName: true, timestamps: false }
  )

CryptoCurrencyHoldingModel.hasOne(CryptoCurrencyModel, {
  foreignKey: "id",
  sourceKey: "cryptoCurrencyId",
  as: "cryptoCurrency",
})

export default CryptoCurrencyHoldingModel
