import Usuario from '../models/usuarioModel.js';
import Disciplina from '../models/disciplinaModel.js';

export function isHorarioValid(horario) {
  const regex = /^[2-7]{2}[MVN][1-6]{5}$/;
  return regex.test(horario);
}

export function isChaveAcessoValid(chave_acesso) {
  const regex = /^[a-zA-Z0-9]+$/;
  return regex.test(chave_acesso);
}

export function isSemestreValid(semestre_id) {
  const regex = /^[1-9]{4}-[1-4]$/;
  return regex.test(semestre_id);
}

export function isTurmaLetraValid(letra) {
  const regex = /^[A-Z]$/;
  return regex.test(letra);
}

export async function isUsuarioDocente(usuarioId) {
  const usuario = await Usuario.findByPk(usuarioId);
  return usuario && usuario.docente;
}

export async function doesDisciplinaExist(disciplinaId) {
  const disciplina = await Disciplina.findByPk(disciplinaId);
  return !!disciplina;
}

export async function doesUsuarioExist(usuarioId) {
  const usuario = await Usuario.findByPk(usuarioId);
  return !!usuario;
}
