'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Likes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull:false,
        type: Sequelize.INTEGER,
        onDelete:'CASCADE',
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      postId: {
        allowNull:false,
        type: Sequelize.INTEGER,
        onDelete:'CASCADE',
        references: {
          model: 'Posts',
          key:'id'
        }
      },
      stateLike: {
        allowNull:false,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Likes');
  }
};