import {
  BelongsTo, Column, ForeignKey,
  Model, PrimaryKey, Table,
} from 'sequelize-typescript';

import InvoiceModel from '../../../invoice/repository/sequelize/invoice.model';

@Table({
  tableName: 'invoice_item',
  timestamps: false
})
export default class InvoiceItemModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  id: string

  @ForeignKey(() => InvoiceModel)
  @Column({ allowNull: false })
  invoiceId: string

  @BelongsTo(() => InvoiceModel)
  invoice: InvoiceModel

  @Column({ allowNull: false })
  name: string

  @Column({ allowNull: false })
  price: number
}
