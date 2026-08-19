'use strict';

import { QueryInterface, DataTypes, Sequelize } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING
      },
      image: {
        type: DataTypes.STRING
      },
      description: {
        type: DataTypes.STRING
      },
      price: {
        type: DataTypes.FLOAT
      },
      active: {
        type: DataTypes.BOOLEAN
      },
      stock: {
        type: DataTypes.INTEGER
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
    await queryInterface.dropTable('products');
  }
};