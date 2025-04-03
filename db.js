const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.db');  // Aquí debes crear tu base de datos

const initDB = () => {
  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL
    )`);
    console.log("Tabla 'users' creada o ya existente.");

    // Insertando algunos datos de ejemplo con personajes de Naruto
    const users = [
      ['Naruto Uzumaki', 'naruto@konoha.com'],
      ['Sasuke Uchiha', 'sasuke@konoha.com'],
      ['Sakura Haruno', 'sakura@konoha.com'],
      ['Kakashi Hatake', 'kakashi@konoha.com']
    ];

    users.forEach(([name, email]) => {
      db.run('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], function (err) {
        if (err) {
          console.log('Error insertando usuario:', err.message);
        }
      });
    });
  });
};

module.exports = { db, initDB };  // Asegúrate de exportar tanto db como initDB
