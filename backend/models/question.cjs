'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    static associate(models) {
    }
  }

  Question.init({
    question_text: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    topic_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    hint: {
      type: DataTypes.STRING,
      allowNull: true
    },
    explanation: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    difficulty: {
      type: DataTypes.STRING,
      allowNull: true
    },
    reference_note: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Question',
    tableName: 'questions',
    timestamps: false
  });
  return Question;
};