// starting variables
let inputTitle = document.getElementById("title-input");
let inputText = document.getElementById("text-input");
let output = document.querySelector(".output");
let closeNote = document.querySelector(".close-note");
let backGrnd = document.querySelector(".background");
let size = false;
let noNotes = true;
let noteCount = 0;
// function to add note on blur
const addNote = () => {
    if(inputTitle.innerHTML !== '' || inputText.innerHTML !== '') {
        noteCount++;
        console.log(noteCount)
        let note = document.createElement("div");
        note.className = "note-block";
        let noteWrap = document.createElement("div");
        noteWrap.className = "note-wrap";
        let buttonsWrap = document.createElement("div");
        buttonsWrap.className = "buttons-wrap";
        note.prepend(noteWrap);
        let closeBtnWrap = document.createElement("div");
        closeBtnWrap.className = "close-btn-wrap";
        let noteTitle = document.createElement("div");
        noteTitle.innerHTML = inputTitle.innerHTML;
        noteTitle.className="note-title-input";
        noteWrap.append(noteTitle);
        let noteText = document.createElement("div");
        noteText.innerHTML = inputText.innerHTML;
        noteText.className="note-text-input";
        noteWrap.append(noteText);
        let deleteBtn = document.createElement("button");
        let closeIcon = document.createElement("i");
        closeIcon.className= "fas fa-trash-alt";
        deleteBtn.append(closeIcon);
        deleteBtn.className = "remove-note";
        buttonsWrap.prepend(deleteBtn);
        note.prepend(buttonsWrap);
        if(noNotes === true) {
            output.innerHTML = '';
            output.classList.remove("output")
            output.classList.add("output-after");
            noNotes = false;
        }
        output.prepend(note)
        size = false;
        noteTitle.tabIndex = "0";
        noteText.tabIndex = "0";
        note.tabIndex = "0";
        // when user clicked on note
        const noteOnFocus = () => {
            if (size === false) {
                noteTitle.setAttribute("data-placeholder", "Enter title");
                noteText.setAttribute("data-placeholder", "Note...");
                noteText.contentEditable = "true";
                noteTitle.contentEditable = "true";
                noteTitle.classList.remove("note-title-input");
                noteText.classList.remove("note-text-input");
                noteTitle.classList.add("note-title-input-after");
                noteText.classList.add("note-text-input-after");
                note.classList.remove("note-block");
                note.classList.add("note-after");
                backGrnd.classList.remove("background");
                backGrnd.classList.add("background-after");
                let closeBtn = document.createElement("button");
                closeBtn.className = "close-note";
                closeBtn.innerHTML = "Close";
                closeBtnWrap.append(closeBtn);
                note.append(closeBtnWrap);
                noteWrap.classList.remove("note-wrap");
                noteWrap.classList.add("note-wrap-after");
                closeBtn.addEventListener("click", () => {
                    noteWrap.classList.remove("note-wrap-after");
                    noteWrap.classList.add("note-wrap");
                    noteTitle.classList.remove("note-title-input-after");
                    noteText.classList.remove("note-text-input-after");
                    noteTitle.classList.add("note-title-input");
                    noteText.classList.add("note-text-input");
                    closeBtnWrap.innerHTML = '';
                    closeBtnWrap.remove();
                    note.classList.remove("note-after");
                    note.classList.add("note-block");
                    noteText.contentEditable = "false";
                    noteTitle.contentEditable = "false";
                    size = false;
                    noteText.removeAttribute("data-placeholder");
                    noteTitle.removeAttribute("data-placeholder");
                    backGrnd.classList.remove("background-after");
                    backGrnd.classList.add("background");
                });
                size = true;
            };
        };
        // when user closed note
        const noteOnBlur = () => {
            noteWrap.classList.remove("note-wrap-after");
                    noteWrap.classList.add("note-wrap");
                    noteTitle.classList.remove("note-title-input-after");
                    noteText.classList.remove("note-text-input-after");
                    noteTitle.classList.add("note-title-input");
                    noteText.classList.add("note-text-input");
                    note.classList.remove("note-after");
                    note.classList.add("note-block");
                    closeBtnWrap.innerHTML = '';
                    closeBtnWrap.remove();
                    size = false;
                    noteText.contentEditable = "false";
                    noteTitle.contentEditable = "false";
                    noteText.removeAttribute("data-placeholder");
                    noteTitle.removeAttribute("data-placeholder");
                    backGrnd.classList.remove("background-after");
                    backGrnd.classList.add("background");
        }
        note.addEventListener("focus", noteOnFocus);
        note.addEventListener("blur", noteOnBlur);
        noteTitle.addEventListener("focus", noteOnFocus);
        noteTitle.addEventListener("blur", noteOnBlur);
        noteText.addEventListener("focus", noteOnFocus);
        noteText.addEventListener("blur", noteOnBlur)
        deleteBtn.addEventListener("focus", () => {
            if(noteCount === 1) {
                output.classList.remove("output-after")
                output.classList.add("output");
                noNotes = true;
                let noNoteTitle = document.createElement("p");
                noNoteTitle.id="no-note";
                noNoteTitle.innerHTML = "Your notes will be here";
                output.append(noNoteTitle)
            }
            note.remove();
            noteCount--;
            console.log(noteCount);
        })
    }
};

// onblur listeners
inputTitle.addEventListener("blur", (e) => {
    if(e.relatedTarget &&  e.relatedTarget.id === 'text-input') {
        e.preventDefault();
    }
    else {
        addNote();
        inputTitle.innerHTML = '';
        inputText.innerHTML = '';
    };
});
inputText.addEventListener("blur", (e) => {
    if(e.relatedTarget &&  e.relatedTarget.id === 'title-input') {
        e.preventDefault();
    }
    else {
        addNote();
        inputTitle.innerHTML = '';
        inputText.innerHTML = '';
    };
});
