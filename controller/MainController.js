const SongModel = require('../models/SongModel');
const path = require('path');

const main = {
    getAllSongs: (req, res) => {
        SongModel.getAllSongs((err, songs) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.render('index', { songs });
            }
        });
    },

    addSong: (req, res) => {
      const newSong = {
        title: req.body.title,
        artist: req.body.artist,
        lyrics: req.body.lyrics,
        image: `/uploads/${req.files.imageFile[0].filename}`,  
        file_path: `/uploads/${req.files.songFile[0].filename}` 
    };
    
        SongModel.addSong(newSong, (err) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.redirect('/');
            }
        });
    },


    deleteSong: (req, res) => {
      const songId = req.params.id;
      SongModel.deleteSong(songId, (err) => {
          if (err) {
              res.status(500).send(err); 
          } else {
              res.redirect('/'); 
          }
      });
  },

    getEditSong: (req, res) => {
      const songId = req.params.id;
      SongModel.getSongById(songId, (err, song) => {
          if (err) {
              res.status(500).send(err);
          } else {
           
              res.render('edit', { song });
          }
      });
  },

    editSong: (req, res) => {
        const songId = req.params.id;
        const updatedSong = {
            title: req.body.title,
            artist: req.body.artist,
            lyrics: req.body.lyrics,
            image: req.files.imageFile ? req.files.imageFile[0].path : req.body.oldImage,
            file_path: req.files.songFile ? req.files.songFile[0].path : req.body.oldFilePath
        };

        SongModel.updateSong(songId, updatedSong, (err) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.redirect('/');
            }
        });
    },

    getSong: (req, res) => {
        const songId = req.params.id;
        SongModel.getSongById(songId, (err, song) => {
            if (err || !song) {
                res.status(500).send(err || 'Song not found');
            } else {
                console.log(song);
                res.render('song', { song });
            }
        });
    }
    
};



module.exports = main;
