const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./users.db')

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY, 
            login TEXT UNIQUE, 
            email TEXT UNIQUE, 
            password TEXT
            )`)
            
    db.run(`CREATE TABLE IF NOT EXISTS tracks (
        id INTEGER PRIMARY KEY, 
        name TEXT,
        author TEXT,
        img BLOB, 
        track_path TEXT
        )`)
});

module.exports = db;