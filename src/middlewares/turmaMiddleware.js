import { 
  isHorarioValid, 
  isChaveAcessoValid, 
  isUsuarioDocente, 
  doesDisciplinaExist, 
  isSemestreValid,
  isTurmaLetraValid 
} from '../helpers/turmaHelper.js';

export function validateHorario(req, res, next) {
  const { horario } = req.body;
  if (!isHorarioValid(horario)) {
    return res.status(400).json({
      message: 'Horário inválido',
      statusCode: 400
    });
  }
  next();
}

export function validateMaxAlunos(req, res, next) {
  const { max_alunos } = req.body;
  if (max_alunos && isNaN(max_alunos) || max_alunos < 0) {
    return res.status(400).json({
        message: 'Máximo de alunos deve ser um número positivo',
        statusCode: 400
    });
}
next();
}

export function validateChaveAcesso(req, res, next) {
  const { chave_acesso } = req.body;
  if (!isChaveAcessoValid(chave_acesso)) {
    return res.status(400).json({
      message: 'Chave de acesso inválida',
      statusCode: 400
    });
  }
  next();
}

export function validateSemestre(req, res, next) {
  const { semestre_id } = req.body;
  if (!isSemestreValid(semestre_id)) {
    return res.status(400).json({
      message: 'Semestre inválido',
      statusCode: 400
    });
  }
  next();
}

export function validateLetra(req, res, next) {
  const { letra } = req.body;
  if (!isTurmaLetraValid(letra)) {
    return res.status(400).json({
      message: 'A letra da turma deve ser uma letra de A a Z maiúscula',
      statusCode: 400
    });
  }
  next();
}

export async function validateDocentes(req, res, next) {
  const { docente_responsavel_id, docente_secundario_id } = req.body;
  
  if (docente_responsavel_id && docente_secundario_id && docente_responsavel_id === docente_secundario_id) {
    return res.status(400).json({
      message: 'O docente responsável e o docente secundário não podem ser a mesma pessoa',
      statusCode: 400
    });
  }

  if (docente_responsavel_id && !(await isUsuarioDocente(docente_responsavel_id))) {
    return res.status(400).json({
      message: 'Docente responsável inválido ou não encontrado',
      statusCode: 400
    });
  }

  if (docente_secundario_id && !(await isUsuarioDocente(docente_secundario_id))) {
    return res.status(400).json({
      message: 'Docente secundário inválido ou não encontrado',
      statusCode: 400
    });
  }

  next();
}

export async function validateDisciplina(req, res, next) {
  const { disciplina_id } = req.body;
  if (!(await doesDisciplinaExist(disciplina_id))) {
    return res.status(400).json({
      message: 'Disciplina não encontrada',
      statusCode: 400
    });
  }
  next();
}
