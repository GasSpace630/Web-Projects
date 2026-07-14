const params = new URLSearchParams(window.location.search);

const newBtn = document.getElementById("new-btn");
const openBtn = document.getElementById("open-btn");
const saveBtn = document.getElementById("save-btn");
const saveAsBtn = document.getElementById("save-as-btn");
const optionsBtn = document.getElementById("options-btn");
const editor = document.getElementById("editor");

let noteID = params.get("id");

const savedText = localStorage.getItem(noteID);

console.log(noteID);

if (noteID == null) {
    noteID = crypto.randomUUID();
    history.replaceState({}, "", "?id=" + noteID);
} else {
    editor.value = savedText;
}

editor.addEventListener("input", function() {
    localStorage.setItem(noteID, editor.value);
});

newBtn.addEventListener("click", function() {
    const newID = crypto.randomUUID();
    window.open("index.html?id" + newID, "_blank");
});
