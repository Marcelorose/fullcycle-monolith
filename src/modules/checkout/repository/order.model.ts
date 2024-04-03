import {
  Column, ForeignKey, Model,
  PrimaryKey, Table,
} from 'sequelize-typescript';

import ClientModel from './client.model';

@Table({
  tableName: "order",
  timestamps: false,
})
export default class TransactionModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  id: string;

  @ForeignKey(() => ClientModel)
  @Column({ allowNull: false, field: "client_id" })
  clientId: string;

  @Column({ allowNull: false })
  status: string;

  @Column({ allowNull: false })
  total: number;

  @Column({ allowNull: false, field: "created_at" })
  createdAt: Date;
}
