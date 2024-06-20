import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  nascimento: {
    type: DataTypes.DATE,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false
  },
  curso: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['CC', 'SI', 'IA', 'ES']]
    }
  },
  docente: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  coordena_curso: {
    type: DataTypes.STRING(2),
    allowNull: true,
    validate: {
      isIn: [['CC', 'SI', 'IA', 'ES', '']]
    }
  },
  vice_diretor: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['ATIVO', 'INATIVO', 'TRANCADO']]
    }
  }
}, {
  tableName: 'usuarios'
});

export default Usuario;
