const db = require('../config/db');

const SongModel = {
    getAllSongs: (callback) => {
        db.query('SELECT * FROM table_playlist', callback);
    },
    addSong: (newSong, callback) => {
        db.query('INSERT INTO table_playlist SET ?', newSong, callback);
    },
    deleteSong: (id, callback) => {
        db.query('DELETE FROM table_playlist WHERE id = ?', [id], callback);
    },
    getSongById: (id, callback) => {
      db.query('SELECT * FROM table_playlist WHERE id = ?', [id], (err, results) => {
          if (err) {
              return callback(err, null);
          } 
          return callback(null, results[0]);  
      });
  },  
    updateSong: (id, updatedSong, callback) => {
        db.query('UPDATE table_playlist SET ? WHERE id = ?', [updatedSong, id], callback);
    }
};

module.exports = SongModel;
