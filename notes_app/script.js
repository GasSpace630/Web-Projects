const promptDialog = document.getElementById("prompt-dialog");
const noteNameInput = document.getElementById("note-name");
const okBtn = document.getElementById("ok-btn");
const cancelBtn = document.getElementById("cancel-btn")


document.querySelectorAll(".save-btn").forEach(button => {
    button.addEventListener("click", save);
});

document.querySelectorAll(".open-btn").forEach(button => {
    button.addEventListener("click", open);
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
    const noteEdit = event.target.closest(".note-edit");
    const textedit = noteEdit.querySelector(".editor");
    const nameLbl = noteEdit.querySelector(".note-name-lbl");
    var text;

    promptDialog.hidden = false;

    getNoteName((key) => {
        promptDialog.hidden = true;
        if (!key) return;
        text = localStorage.getItem(key);
        if (text == null) {
            alert("Note not Found!!!");
            return;
        }
        textedit.value = text;
        nameLbl.textContent = key;
    });

}

