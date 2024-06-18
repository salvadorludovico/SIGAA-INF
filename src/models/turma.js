import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Disciplina from './disciplina.js';

const Turma = sequelize.define('Turma', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  disciplina_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Disciplina,
      key: 'id'
    }
  },
  letra: {
    type: DataTypes.CHAR(1),
    allowNull: false
  },
  semestre_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  plano_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  docente_responsavel: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  docente_secundario: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  horario: {
    type: DataTypes.STRING,
    allowNull: false
  },
  local: {
    type: DataTypes.STRING,
    allowNull: false
  },
  max_alunos: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  chave_acesso: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'turmas'
});

export default Turma;
