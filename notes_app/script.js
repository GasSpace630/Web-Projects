const promptDialog = document.getElementById("prompt-dialog");
const noteNameInput = document.getElementById("note-name");
const okBtn = document.getElementById("ok-btn");
const cancelBtn = document.getElementById("cancel-btn")

const openBtn = document.getElementById("open-btn");
const newBtn = document.getElementById("new-btn");


document.querySelectorAll(".save-btn").forEach(button => {
    button.addEventListener("click", save);
});

document.addEventListener("click", () => {
    if (event.target.classList.contains("close-btn")) {
        event.target.closest(".note-edit").remove();
    }
});

function getNoteName(callback) {
    noteNameInput.value = "";
    noteNameInput.focus();
    okBtn.onclick = () => {
        callback(noteNameInput.value.trim());
    }

    cancelBtn.onclick = () => {
        callback(null);
    }

    noteNameInput.onkeydown = (event) => {
        if (event.key == "Enter") okBtn.onclick();
    }
}

function createNote(name = "Untitled", text = "") {
    const template = document.getElementById("note-template");
    const note = template.content.firstElementChild.cloneNode(true);
    note.querySelector(".note-name-lbl").textcontent = name;
    note.querySelector(".editor").value = text;
    document.body.appendChild(note);
}

function save(event) {
    const noteEdit = event.target.closest(".note-edit");
    const textarea = noteEdit.querySelector(".editor");
    const nameLbl = noteEdit.querySelector(".note-name-lbl");

    promptDialog.hidden = false;

    getNoteName((key) => {
        promptDialog.hidden = true;
        if (!key) return;
        localStorage.setItem(key, textarea.value);
        nameLbl.textContent = key;
    });
}

function open(event) {
    promptDialog.hidden = false;

    getNoteName((key) => {
        promptDialog.hidden = true;
        if (!key) return;
        const text = localStorage.getItem(key);
        if (text == null) {
            alert("Note not Found!!!");
            return;
        }
        createNote(key, text);
    });

}

openBtn.addEventListener("click", open);
newBtn.addEventListener("click", () => {
    createNote();
});
