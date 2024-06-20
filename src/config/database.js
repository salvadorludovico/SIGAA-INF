import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import { Sequelize } from 'sequelize'

export async function openDb () {
  return open({
    filename: './database.db',
    driver: sqlite3.Database
  })
}

export async function createDb () {
    const db = new sqlite3.Database('database.db', (err) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log('Connected to the SQLite database.');
      }
    });
    return db;
}

export async function openSequelizeDb () {
  return new Sequelize({
    dialect: 'sqlite',
    storage: './database.db'
  });
}

export async function testConnection (sequelize) {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.db'
});

export default sequelize;