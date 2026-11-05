export const Dropdown = ({ id, label, items, extraClass = '' }) => `
  <div class="dropdown ${extraClass}">
    <label tabindex="0" class="btn m-1">${label}</label>
    <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
      ${items.map(item => `<li><a href="#" class="dropdown-item" data-id="${item.id}">${item.label}</a></li>`).join('')}
    </ul>
  </div>
`;
