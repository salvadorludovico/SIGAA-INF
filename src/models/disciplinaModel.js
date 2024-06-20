import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Disciplina = sequelize.define('Disciplina', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  codigo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  ementa: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ch_teorica: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  ch_pratica: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  curso: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['CC', 'SI', 'IA', 'ES']]
    }
  }
}, {
  tableName: 'disciplinas'
});

export default Disciplina;
