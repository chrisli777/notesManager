document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.querySelector('.new-note');
    const searchInput = document.querySelector('.search-note');
    const noteList = document.getElementById('noteList');
    const mainContent = document.getElementById('noteContent');

    let noteCounter = 0;

    addButton.addEventListener('click', function() {
        noteCounter++;
        const noteId = `note-${noteCounter}`;
        const noteTitle = prompt("Enter note title:", `Note ${noteCounter}`); 

        if (noteTitle) {
            createNoteItem(noteId, noteTitle);
        }
    });

    searchInput.addEventListener('input', function() {
        const searchTerm = searchInput.value.toLowerCase();
        let found = false;

        mainContent.querySelectorAll('textarea').forEach(textarea => {
            const relatedTitle = textarea.placeholder.replace('Content for ', '');
            if (relatedTitle.toLowerCase().includes(searchTerm)) {
                found = true;
                loadNoteContent(textarea.id); // Use the ID of the textarea to load content
            }
        });

        if (!found) {
            mainContent.querySelectorAll('textarea').forEach(textarea => {
                textarea.style.display = 'none';
            });
        }
    });

    function createNoteItem(noteId, noteTitle) {
        const noteItem = document.createElement('li');
        noteItem.className = 'note-item';
        noteItem.id = `item-${noteId}`;

        const noteButton = document.createElement('button');
        noteButton.className = 'note-title';
        noteButton.textContent = noteTitle;
        noteButton.onclick = function() {
            loadNoteContent(noteId);
        };

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-note';
        deleteButton.textContent = 'X';
        deleteButton.onclick = function() {
            noteItem.remove();
            document.getElementById(noteId).remove();
        };

        const editDiv = document.createElement('div');
        editDiv.className = 'edit-buttons';
        editDiv.appendChild(deleteButton);

        noteItem.appendChild(noteButton);
        noteItem.appendChild(editDiv);

        noteList.appendChild(noteItem);

        const noteContent = document.createElement('textarea');
        noteContent.id = noteId;
        noteContent.placeholder = `Content for ${noteTitle}...`;
        noteContent.style.display = 'none';
        mainContent.appendChild(noteContent);
    }

    function loadNoteContent(noteId) {
        const allTextareas = mainContent.querySelectorAll('textarea');
        const allNoteItems = noteList.querySelectorAll('.note-item');
    
        allTextareas.forEach(textarea => {
            textarea.style.display = 'none'; 
        });
    
        allNoteItems.forEach(item => {
            item.classList.remove('active'); // Remove active class from all note items
        });
    
        const selectedContent = document.getElementById(noteId);
        const selectedNoteItem = document.getElementById(`item-${noteId}`);
        
        if (selectedContent) {
            selectedContent.style.display = 'block'; // Show the selected note's content
            selectedNoteItem.classList.add('active'); // Add active class to the selected note item
        }
    }
    
});
