import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import { Sequelize } from 'sequelize'

// you would have to import / invoke this in another file
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

// export async function createAllTables () {
//   const db = await openDb();

//   try {
//     await db.exec(`
//       CREATE TABLE usuarios (
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       nome TEXT NOT NULL,
//       nascimento DATE NOT NULL,
//       email TEXT NOT NULL UNIQUE,
//       senha TEXT NOT NULL,
//       curso TEXT NOT NULL CHECK (curso IN ('CC', 'SI', 'IA', 'ES')),
//       docente BOOLEAN DEFAULT FALSE,
//       coordena_curso TEXT CHECK (coordena_curso IN ('CC', 'SI', 'IA', 'ES', '')),
//       vice_diretor BOOLEAN DEFAULT FALSE,
//       status TEXT NOT NULL CHECK (status IN ('ATIVO', 'INATIVO', 'TRANCADO')));  
//     `)

//     await db.exec(`
//       CREATE TABLE disciplina (
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       ementa TEXT NOT NULL,
//       ch_teorica INTEGER NOT NULL,
//       ch_pratica INTEGER NOT NULL,
//       curso TEXT NOT NULL CHECK (curso IN ('CC', 'SI', 'IA', 'ES')));
//     `)

//     await db.exec(`
//       CREATE TABLE turma (
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       disciplina_id INTEGER NOT NULL,
//       letra CHAR(1) NOT NULL,
//       semestre_id INTEGER NOT NULL,
//       plano_id INTEGER NOT NULL,
//       docente_responsavel INTEGER NOT NULL,
//       docente_secundario INTEGER,
//       horario TEXT NOT NULL,
//       local TEXT NOT NULL,
//       max_alunos INTEGER NOT NULL,
//       chave_acesso TEXT NOT NULL,
//       FOREIGN KEY (disciplina_id) REFERENCES disciplina(id));
//     `)

//     await db.exec(`
//       CREATE TABLE discente_turma (
//       turma_id INTEGER NOT NULL,
//       aluno_id INTEGER NOT NULL,
//       status TEXT NOT NULL CHECK (status IN ('CURSANDO', 'APROVADO', 'REPROVADO', 'TRANCADO')),
//       PRIMARY KEY (turma_id, aluno_id),
//       FOREIGN KEY (turma_id) REFERENCES turma(id),
//       FOREIGN KEY (aluno_id) REFERENCES usuarios(id));
//     `)

//     db.close();
//   } catch (error) {
//     console.error('Error creating tables:', error);
//   }
// }

