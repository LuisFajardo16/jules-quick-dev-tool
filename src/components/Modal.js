export const Modal = ({ id, title, content, actions }) => `
  <dialog id="${id}" class="modal">
    <div class="modal-box">
      <h3 class="font-bold text-lg">${title}</h3>
      <div class="py-4">
        ${content}
      </div>
      <div class="modal-action">
        <form method="dialog">
          <!-- if there is a button in form, it will close the modal -->
          ${actions || '<button class="btn">Close</button>'}
        </form>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
`;
