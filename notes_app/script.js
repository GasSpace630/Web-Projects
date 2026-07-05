const saveDialog = document.getElementById("save-dialog");
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

    getNoteName((key) => {
        if (!key) return;
        localStorage.setItem(key, textarea.value);

    });
}

function open(event) {
    const noteEdit = event.target.closest(".note-edit");
    const textedit = noteEdit.querySelector(".editor");

    const key = prompt("Enter Note Name: ");
    if (!key) return;

    const text = localStorage.getItem(key);
    if (text == null) {
        alert("Note not Found!!!");
        return;
    }

    textarea.value = text;
}

