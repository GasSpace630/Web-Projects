const newBtn = document.getElementById("new-btn");
const openBtn = document.getElementById("open-btn");
const saveBtn = document.getElementById("save-btn");
const saveAsBtn = document.getElementById("save-as-btn");
const optionsBtn = document.getElementById("options-btn");
const editor = document.getElementById("editor");
const lineNumbers = document.getElementById("line-numbers")
const notesList = document.getElementById("notes-list");
const noteNameLbl = document.getElementById("note-name-lbl");

const promptDialog = document.getElementById("prompt-dialog");
const noteNameInput = document.getElementById("note-name");
const okBtn = document.getElementById("ok-btn");
const cancelBtn = document.getElementById("cancel-btn");

let promptAction = null;
let currentNote = null;

// create a new note on launch
newNote();

// show saved note names
updateNotesList();

updateLineNumbers();

function newNote() {
	editor.value = "";
	currentNote = null;
	noteNameLbl.textContent = "untitled";
}

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

	if (!note) {
		alert("note NOT fount!")
		return null;
	}
	currentNote = note.title;
	noteNameLbl.textContent = currentNote;
	return note || null;
}

function updateNotesList() {
	const notes = JSON.parse(localStorage.getItem("notes")) || [];
	notesList.innerHTML = "";
	notes.forEach((note) => {
		const noteBtn = document.createElement("button");
		noteBtn.className = "note-btn";
		noteBtn.textContent = note.title;

		noteBtn.addEventListener("click", () => {
			const loadedNote = loadNote(note.title);

			if (loadedNote) {
				currentNote = loadedNote.title;
				editor.value = loadedNote.data;
				noteNameLbl.textContent = loadedNote.title;
			}
		});
		notesList.appendChild(noteBtn);
	});
}

function updateLineNumbers() {
	const lineCount = editor.value.split("\n").length;
	let numbers = "1";

	for (let i = 2; i < lineCount+1; i++) {
		numbers += "\n" + i;
	}
	lineNumbers.textContent = numbers;
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

editor.addEventListener("input", updateLineNumbers);

editor.addEventListener("scroll", () => {
	lineNumbers.scrollTop = editor.scrollTop;
});

okBtn.addEventListener("click", () => {
	const title = noteNameInput.value.trim();
	if (title == "") {
		alert("Enter a note name!");
		return;
	}
	promptAction(title);
	hidePrompt();
});

cancelBtn.addEventListener("click", () => {
	hidePrompt();
});

saveBtn.addEventListener("click", () => {
	if (currentNote == null) {
		showPrompt((title) => {
			saveNote(title, editor.value);
			currentNote = title;
		});
	} else {
		saveNote(currentNote, editor.value);
		updateNotesList();
	}
});

saveAsBtn.addEventListener("click", () => {
	showPrompt((title) => {
		saveNote(title, editor.value);
		currentNote = title;
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

newBtn.addEventListener("click", () => {
	newNote();
	updateNotesList();
});