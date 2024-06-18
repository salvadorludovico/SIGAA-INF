import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Turma from './turma.js';
import Usuario from './usuario.js';

const DiscenteTurma = sequelize.define('DiscenteTurma', {
  turma_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Turma,
      key: 'id'
    }
  },
  aluno_id: {
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
