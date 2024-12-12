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
        author INTEGER,
        img TEXT, 
        file_name TEXT,
        FOREIGN KEY (author) REFERENCES artists(id)
        )`)

    db.run(`CREATE TABLE IF NOT EXISTS liked (
        id INTEGER PRIMARY KEY, 
        user_id INTEGER,
        track_id INTEGER,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (track_id) REFERENCES tracks(id)
        )`)

    db.run(`CREATE TABLE IF NOT EXISTS playlists (
        id INTEGER PRIMARY KEY, 
        name TEXT,
        img TEXT,
        creator_id INTEGET,
        FOREIGN KEY (creator_id) REFERENCES users(id)
        )`)
    
    db.run(`CREATE TABLE IF NOT EXISTS playlisttracks (
        id INTEGER PRIMARY KEY, 
        playlist_id INTEGER,
        track_id INTEGER,
        FOREIGN KEY (playlist_id) REFERENCES playlists(id),
        FOREIGN KEY (track_id) REFERENCES tracks(id)
        )`)

    db.run(`CREATE TABLE IF NOT EXISTS artists (
        id INTEGER PRIMARY KEY, 
        name TEXT,
        img TEXT
        )`)

    db.run(`CREATE TABLE IF NOT EXISTS subscribes (
        id INTEGER PRIMARY KEY, 
        user_id INTEGER,
        artist_id INTEGER, 
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (artist_id) REFERENCES artists(id)
        )`)
});

module.exports = db;