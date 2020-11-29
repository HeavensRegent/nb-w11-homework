const express = require('express');
const path = require('path');
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"))
});

app.get("/api/notes", function(req, res) {
    return res.json(getApiNotes());
});

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.post("/api/notes", function(req, res) {
    saveApiNotes(req.body);
    return res.json({message: "Note saved successfully"});
});

app.delete("/api/notes/:id", function(req, res) {
    deleteApiNote(req.params.id);
    return res.json({message: "Node deleted successfully"});
})

function getApiNotes() {
    let notes = JSON.parse(readFromFile('db.json'));
    console.log(notes);
    return notes;
}

function saveApiNotes(note) {
    let notes = getApiNotes();

    let indexOfNote = notes.findIndex(e => note.id && e.id === note.id);
    //Replace .id with an appropriate identifier
    if(indexOfNote === -1)
        notes.push({...note, id: generateId(note.title)});
    else
        notes[indexOfNote] = note;
    
    console.log(notes);
    writeToFile('db.json', JSON.stringify(notes));
}

function deleteApiNote(id) {
    let notes = getApiNotes();

    let indexOfNote = notes.findIndex(e => id && e.id === id);
    if(indexOfNote !== -1)
    {
        notes.splice(indexOfNote, 1);

        writeToFile('db.json', JSON.stringify(notes));
    }
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
    return;
}

function generateId(title) {
    title = title.split(" ").join("");
    title += Date.now();
    return title;
}

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});