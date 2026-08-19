'use strict';

import { QueryInterface, DataTypes, Sequelize } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable('orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      status: {
        type: DataTypes.STRING
      },
      total: {
        type: DataTypes.FLOAT
      },
      customerName: {
        type: DataTypes.STRING
      },
      country: {
        type: DataTypes.STRING
      },
      street: {
        type: DataTypes.STRING
      },
      city: {
        type: DataTypes.STRING
      },
      zipCode: {
        type: DataTypes.STRING
      },
      phone: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('now()'), 
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('now()'), 
      }
    });
  },
  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('orders');
  }
};