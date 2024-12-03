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
        img TEXT, 
        added_at DATATIME DEFAULT NOW,
        file_name TEXT
        )`)

    db.run(`CREATE TABLE IF NOT EXISTS liked (
        id INTEGER PRIMARY KEY, 
        user_id INTEGER,
        track_id INTEGER,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (track_id) REFERENCES tracks(id)
        )`)
});

module.exports = db;