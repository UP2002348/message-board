// start at 1:07:07

import config from './config.js';
import Postgres from 'pg';
import fs from 'fs/promises';
import util from 'util';
import path from 'path';

fs.renameAsync = fs.renameAsync || util.promisify(fs.rename); 

const sql = new Postgres.Client(config);

sql.on('error', (err) => {
  console.error('SQL Fail', err);
  sql.end();
});

sql.connect();

function addImagePath(message){
  if (message.file){
    message.avatar = '/image/' + message.file;
  }
}

export async function listMessages() {
  const q = 'SELECT * FROM Messageboard ORDER BY time DESC LIMIT 10;';
  const result = await sql.query(q);
  result.rows.forEach(addImagePath);
  console.log(result.rows);
  return result.rows;
}

export async function findMessage(id) {
  const q = 'SELECT * FROM Messageboard WHERE id = $1;';
  const result = await sql.query(q, [id]);
  return result.rows[0];
}

export async function addMessage(msg) {
  const q = 'INSERT INTO Messageboard (msg) VALUES ($1);';
  await sql.query(q, [msg]);
  return listMessages();
}

export async function editMessage(updatedMessage) {
  const q = 'UPDATE Messageboard SET msg = $1 WHERE id = $2';
  await sql.query(q, [updatedMessage.msg, updatedMessage.id]);
  return findMessage(updatedMessage.id);
}