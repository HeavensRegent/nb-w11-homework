const express = require('express');
const path = require('path');
const fs = require("fs");

const app = express();
const PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"))
});

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

function getApiNotes() {
    let notes = json.PARSE(readFromFile('db.json'));
    console.log(notes);
}

function saveApiNotes(note) {
    let notes = getApiNotes();

    //Replace .id with an appropriate identifier
    notes.id = note;
    writeToFile('db.json', notes);
}

function deleteApiNote(id) {

}

// function to write README file
function writeToFile(fileName, data) {
    let outputDir = './db'
    try {
        if(!fs.existsSync('./db')) {
            fs.mkdirSync('./db');
        }
        fs.writeFileSync(`${outputDir}/${fileName}`, data, 'UTF8');
    } catch(e) {
        console.log(e);
    }
}

//function to retrieve a file
function readFromFile(fileName) {
    try {
        return fs.readFileSync(path.resolve('./db/', fileName), "utf8");
    } catch(e) {
        console.log(e);
    }
}

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});