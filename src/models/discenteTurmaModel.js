import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Turma from './turmaModel.js';
import Usuario from './usuarioModel.js';

const DiscenteTurma = sequelize.define('DiscenteTurma', {
  turma_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Turma,
      key: 'id'
    }
  },
  discente_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Usuario,
      key: 'id'
    }
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['CURSANDO', 'APROVADO', 'REPROVADO', 'TRANCADO']]
    }
  }
}, {
  tableName: 'discente_turma'
});

export default DiscenteTurma;
