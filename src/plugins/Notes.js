import { Button } from '../components/Button.js';
import { Input } from '../components/Input.js';

export const NotesPlugin = {
  name: 'Notes',
  description: 'Manage simple quick notes with local storage persistence.',
  icon: '📝',

  _getNotes() {
     try {
       const saved = localStorage.getItem('mi_web_tools_notes');
       return saved ? JSON.parse(saved) : [];
     } catch (e) {
       return [];
     }
  },

  _saveNotes(notes) {
     localStorage.setItem('mi_web_tools_notes', JSON.stringify(notes));
  },

  _createNote(title, content) {
     const notes = this._getNotes();
     const newNote = {
        id: Date.now().toString(),
        title: title || 'Untitled',
        content: content || '',
        createdAt: new Date().toISOString()
     };
     notes.push(newNote);
     this._saveNotes(notes);
     return newNote;
  },

  _deleteNote(id) {
     const notes = this._getNotes();
     const filtered = notes.filter(n => n.id !== id);
     this._saveNotes(filtered);
  },

  render(container) {
    // Initial Render
    this._renderUI(container);

    // Attach global event handlers specifically for this plugin instance
    window._notesPluginHandleAdd = () => {
       const title = document.getElementById('note-title-input').value;
       const content = document.getElementById('note-content-input').value;
       if (title.trim() === '' && content.trim() === '') return;

       this._createNote(title, content);
       this._renderUI(container); // Re-render
    };

    window._notesPluginHandleDelete = (id) => {
       this._deleteNote(id);
       this._renderUI(container); // Re-render
    };
  },

  _renderUI(container) {
    const notes = this._getNotes();

    const notesListHTML = notes.length === 0
      ? `<p class="text-base-content/60 text-center py-8">No notes yet. Create one above!</p>`
      : notes.map(note => `
          <div class="card bg-base-200 shadow-md">
            <div class="card-body p-4 relative group">
              <h3 class="card-title text-lg">${note.title}</h3>
              <p class="whitespace-pre-wrap">${note.content}</p>
              <div class="card-actions justify-end mt-2">
                 <span class="text-xs text-base-content/40 absolute bottom-4 left-4">${new Date(note.createdAt).toLocaleString()}</span>
                 <button
                   class="btn btn-error btn-xs btn-outline opacity-0 group-hover:opacity-100 transition-opacity"
                   onclick="window._notesPluginHandleDelete('${note.id}')"
                 >Delete</button>
              </div>
            </div>
          </div>
        `).reverse().join('');

    container.innerHTML = `
      <div class="max-w-4xl mx-auto flex flex-col h-full">
        <div class="mb-6 flex justify-between items-end border-b pb-4">
           <div>
              <h2 class="text-3xl font-bold">📝 Notes</h2>
              <p class="text-base-content/70">Quickly jot down your thoughts.</p>
           </div>
        </div>

        <div class="bg-base-200 p-4 rounded-box mb-6 shadow-sm">
           <h3 class="font-semibold mb-2">Create New Note</h3>
           ${Input({ id: 'note-title-input', placeholder: 'Note Title' })}
           <div class="mt-2">
              <textarea id="note-content-input" class="textarea textarea-bordered w-full h-24" placeholder="Note Content..."></textarea>
           </div>
           <div class="mt-2 flex justify-end">
              ${Button({ text: 'Add Note', variant: 'primary', id: 'btn-add-note', extraClass: 'btn-sm' })}
           </div>
        </div>

        <div class="flex-1 overflow-y-auto">
           <h3 class="font-semibold mb-4 text-lg">Your Notes</h3>
           <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              ${notesListHTML}
           </div>
        </div>
      </div>
    `;

    // Attach listener to the button just rendered
    document.getElementById('btn-add-note').addEventListener('click', window._notesPluginHandleAdd);
  }
};
