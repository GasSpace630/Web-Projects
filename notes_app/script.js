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
let promptAction = null;

// show saved note names
updateNotesList();

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
    updateNotesList();
}

function loadNote(title) {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    const note = notes.find(note => note.title == title);
    return note || null;
}

function updateNotesList() {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    notesList.innerHTML = "";
    notes.forEach((note) => {
        const div = document.createElement("div");
        div.textContent = note.title;
        notesList.appendChild(div);
    });
}

function showPrompt(action) {
    promptAction = action;
    noteNameInput.value = "";
    promptDialog.hidden = false;
    noteNameInput.focus();
}

function hidePrompt() {
    promptDialog.hidden = true;
}

noteNameInput.addEventListener("keydown", (event) => {
    if (event.key == "Enter") okBtn.click();
});

okBtn.addEventListener("click", () => {
    const title = noteNameInput.value.trim();
    if (title == "") {
        alert("Enter a note name!");
    }
    promptAction(title);
    hidePrompt();
});

cancelBtn.addEventListener("click", () => {
    hidePrompt();
});

saveBtn.addEventListener("click", () => {
    showPrompt((title) => {
        saveNote(title, editor.value);
    });
});

openBtn.addEventListener("click", () => {
    showPrompt((title) => {
        const note = loadNote(title);
        if (note) {
            editor.value = note.data;
        } else {
            alert("note not found!");
        }
    });
});
