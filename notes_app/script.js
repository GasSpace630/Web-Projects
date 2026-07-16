const newBtn = document.getElementById("new-btn");
const openBtn = document.getElementById("open-btn");
const saveBtn = document.getElementById("save-btn");
const saveAsBtn = document.getElementById("save-as-btn");
const optionsBtn = document.getElementById("options-btn");
const editor = document.getElementById("editor");
const notesList = document.getElementById("notes-list");

const promptDialog = document.getElementById("prompt-dialog");
const noteNameInput = document.getElementById("note-name");
const okBtn = document.getElementById("ok-btn");
const cancelBtn = document.getElementById("cancel-btn");

// "save" , "open"
let promptMode = "";

function saveNote(title, data) {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    const index = notes.findIndex(note => note.title == title);
    if (index != -1) {
        notes[index].data = data;
    } else {
        notes.push({
            title : title,
            data : data,
        });
    }
    localStorage.setItem("notes", JSON.stringify(notes));
}

function loadNote(title) {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    const note = notes.find(note => note.title == title);
    return note || null;
}

function showPrompt(mode) {
    promptMode = mode;
    noteNameInput.value = "";
    promptDialog.hidden = false;
    noteNameInput.focus();
}

function hidePrompt() {
    promptDialog.hidden = true;
}

okBtn.addEventListener("click", () => {
    const title = noteNameInput.value.trim();
    if (title == "") {
        alert("Enter a note name!");
    }
    if (promptMode == "save") {
        saveNote(title, editor.value);
    }
    if (promptMode == "open") {
        const note = loadNote(title);
        if (note) {
            editor.value = note.data;
        } else {
            alert("Note not found!");
        }
    }
    hidePrompt();
});

cancelBtn.addEventListener("click", () => {
    hidePrompt();
});

saveBtn.addEventListener("click", () => {
    showPrompt("save");
});

openBtn.addEventListener("click", () => {
    showPrompt("open")
});
