const express = require('express');
const Note = require('../models/note');
const router = express.Router();

router
  .get('/', async (req, res) => {
    try {
      const notes = await Note.getAllNotes();
      res.send(notes);
    } catch(err) {
      res.status(401).send({message: err.message});
    }
  })

  .get('/readnote', async (req, res) => {
    try {
      let note = await Note.read(req.body);
    } catch(err) {
      res.status(401).send({message: err.message});
    }
  })

  .post('/addnote', async (req, res) => {
    try {
      let note = await Note.create(req.body);
      res.send({...note})
    } catch(err) {
      res.status(401).send({message: err.message});
    }
  })

  .put('/modifynote', async (req, res) => {
    try {
      let note = await Note.modify(req.body);
      res.send({...note});
    } catch(err) {
      res.status(401).send({message: err.message})
    }
  })

  .delete('/removenote', async (req, res) => {
    try {
      Note.remove(req.body);
      res.send({success: "Note removed... :("})
    } catch(err) {
      res.status(401).send({message: err.message})
    }
  })

module.exports = router;