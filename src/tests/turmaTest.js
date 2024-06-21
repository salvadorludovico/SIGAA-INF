import request from 'supertest';
import { expect } from 'chai';
import { app } from '../app.js';
import sequelize from '../config/database.js';
import Turma from '../models/turmaModel.js';
import Disciplina from '../models/disciplinaModel.js';
import Usuario from '../models/usuarioModel.js';

// Sincronizar o banco de dados antes de executar os testes
before(async () => {
    await sequelize.sync();

    await Turma.destroy({ where: {} });
    await Disciplina.destroy({ where: {} });
    await Usuario.destroy({ where: {} });

    // Criar usuários docentes para os testes
    await Usuario.bulkCreate([
        { nome: 'Docente Responsável', nascimento: '1980-01-01', email: 'docente1@example.com', senha: 'senha123', curso: 'CC', docente: true, status: 'ATIVO' },
        { nome: 'Docente Secundário', nascimento: '1985-01-01', email: 'docente2@example.com', senha: 'senha123', curso: 'SI', docente: true, status: 'ATIVO' },
        { nome: 'Discente', nascimento: '1985-01-01', email: 'discente3@example.com', senha: 'senha123', curso: 'SI', docente: true, status: 'ATIVO' },
    ]);

    // Criar uma disciplina para os testes
    await Disciplina.create({ id: 1, codigo: 'CS101', ementa: 'Computação', ch_teorica: 60, ch_pratica: 40, curso: 'CC' });
});

// Limpar os dados após cada teste
afterEach(async () => {
    await Turma.destroy({ where: {} });
    await Disciplina.destroy({ where: {} });
    await Usuario.destroy({ where: {} });
});

// Fechar a conexão com o banco de dados após a execução dos testes
after(async () => {
    await sequelize.close();
});


describe('Turma Controller', () => {
    it('POST /api/turmas - Deve criar uma nova turma', async () => {
        const disciplina = await Disciplina.create({ codigo: 'CS101', ementa: 'Computação', ch_teorica: 60, ch_pratica: 40, curso: 'CC' });
        const docente1 = await Usuario.create({ nome: 'Docente Responsável', nascimento: '1980-01-01', email: 'docente1@example.com', senha: 'senha123', curso: 'CC', docente: true, status: 'ATIVO' });
        const docente2 = await Usuario.create({ nome: 'Docente Secundario', nascimento: '1980-01-01', email: 'docente2@example.com', senha: 'senha123', curso: 'CC', docente: true, status: 'ATIVO' });
        
        const turma = {
            disciplina_id: disciplina.id,
            letra: 'A',
            semestre_id: '1',
            docente_responsavel_id: docente1.id,
            docente_secundario_id: docente2.id,
            horario: '56M23456',
            local: 'CAB - 204',
            max_alunos: 30,
            chave_acesso: '123456'
        };

        const res = await request(app).post('/api/turmas').send(turma);
        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('id');
        expect(res.body.data.letra).to.equal('A');
    });
  
    it('POST /api/turmas - Deve falhar se o docente responsável e o secundário forem o mesmo', async () => {
        const turma = {
            disciplina_id: 1,
            letra: 'A',
            semestre_id: '2024-1',
            plano_id: 1,
            docente_responsavel_id: 1,
            docente_secundario_id: 1,
            horario: '56M23456',
            local: 'CAB - 204',
            max_alunos: 30,
            chave_acesso: '123456'
        };

        const res = await request(app).post('/api/turmas').send(turma);
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('O docente responsável e o docente secundário não podem ser a mesma pessoa');
    });
  
    it('POST /api/turmas - Deve falhar se o docente responsável não for válido', async () => {
      const turma = {
        disciplina_id: 1,
        letra: 'A',
        semestre_id: '2024-1',
        plano_id: 1,
        docente_responsavel_id: 999, // ID inválido
        docente_secundario_id: 2,
        horario: '56M23456',
        local: 'CAB - 204',
        max_alunos: 30,
        chave_acesso: '123456'
      };
  
      const res = await request(app).post('/api/turmas').send(turma);
      expect(res.status).to.equal(400);
      expect(res.body.message).to.equal('Docente responsável inválido ou não encontrado');
    });
  
    it('POST /api/turmas - Deve falhar se o docente secundário não for válido', async () => {
      const turma = {
        disciplina_id: 1,
        letra: 'A',
        semestre_id: '2024-1',
        plano_id: 1,
        docente_responsavel_id: 1,
        docente_secundario_id: 999, // ID inválido
        horario: '56M23456',
        local: 'CAB - 204',
        max_alunos: 30,
        chave_acesso: '123456'
      };
  
      const res = await request(app).post('/api/turmas').send(turma);
      expect(res.status).to.equal(400);
      expect(res.body.message).to.equal('Docente secundário inválido ou não encontrado');
    });
  
    it('POST /api/turmas - Deve falhar se o horário for inválido', async () => {
      const turma = {
        disciplina_id: 1,
        letra: 'A',
        semestre_id: '2024-1',
        plano_id: 1,
        docente_responsavel_id: 1,
        docente_secundario_id: 2,
        horario: 'invalid',
        local: 'CAB - 204',
        max_alunos: 30,
        chave_acesso: '123456'
      };
  
      const res = await request(app).post('/api/turmas').send(turma);
      expect(res.status).to.equal(400);
      expect(res.body.message).to.equal('Horário inválido');
    });
  
    it('POST /api/turmas - Deve falhar se a chave de acesso for inválida', async () => {
      const turma = {
        disciplina_id: 1,
        letra: 'A',
        semestre_id: '2024-1',
        plano_id: 1,
        docente_responsavel_id: 1,
        docente_secundario_id: 2,
        horario: '56M23456',
        local: 'CAB - 204',
        max_alunos: 30,
        chave_acesso: 'invalid'
      };
  
      const res = await request(app).post('/api/turmas').send(turma);
      expect(res.status).to.equal(400);
      expect(res.body.message).to.equal('Chave de acesso inválida');
    });
  
    it('POST /api/turmas - Deve falhar se o semestre for inválido', async () => {
      const turma = {
        disciplina_id: 1,
        letra: 'A',
        semestre_id: 'invalid',
        plano_id: 1,
        docente_responsavel_id: 1,
        docente_secundario_id: 2,
        horario: '56M23456',
        local: 'CAB - 204',
        max_alunos: 30,
        chave_acesso: '123456'
      };
  
      const res = await request(app).post('/api/turmas').send(turma);
      expect(res.status).to.equal(400);
      expect(res.body.message).to.equal('Semestre inválido');
    });
  
    it('POST /api/turmas - Deve falhar se a letra da turma for inválida', async () => {
      const turma = {
        disciplina_id: 1,
        letra: 'invalid',
        semestre_id: '2024-1',
        plano_id: 1,
        docente_responsavel_id: 1,
        docente_secundario_id: 2,
        horario: '56M23456',
        local: 'CAB - 204',
        max_alunos: 30,
        chave_acesso: '123456'
      };
  
      const res = await request(app).post('/api/turmas').send(turma);
      expect(res.status).to.equal(400);
      expect(res.body.message).to.equal('A letra da turma deve ser uma letra de A a Z maiúscula');
    });
  
    it('POST /api/turmas - Deve falhar se a disciplina não existir', async () => {
      const turma = {
        disciplina_id: 999, // ID inválido
        letra: 'A',
        semestre_id: '2024-1',
        plano_id: 1,
        docente_responsavel_id: 1,
        docente_secundario_id: 2,
        horario: '56M23456',
        local: 'CAB - 204',
        max_alunos: 30,
        chave_acesso: '123456'
      };
  
      const res = await request(app).post('/api/turmas').send(turma);
      expect(res.status).to.equal(400);
      expect(res.body.message).to.equal('Disciplina não encontrada');
    });
  
    it('POST /api/turmas - Deve falhar se o máximo de alunos não for um número positivo', async () => {
      const turma = {
        disciplina_id: 1,
        letra: 'A',
        semestre_id: '2024-1',
        plano_id: 1,
        docente_responsavel_id: 1,
        docente_secundario_id: 2,
        horario: '56M23456',
        local: 'CAB - 204',
        max_alunos: -1, // Valor inválido
        chave_acesso: '123456'
      };
  
      const res = await request(app).post('/api/turmas').send(turma);
      expect(res.status).to.equal(400);
      expect(res.body.message).to.equal('Máximo de alunos deve ser um número positivo');
    });
  });