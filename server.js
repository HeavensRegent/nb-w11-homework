const express = require('express');
const path = require('path');
const fs = require("fs");

const app = express();
const PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"))
})

function getApiNotes() {

}

function saveApiNotes(note) {

}

function deleteApiNote(id) {
    
}