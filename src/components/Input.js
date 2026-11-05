export const Input = ({ type = 'text', placeholder, value = '', id, label, extraClass = '' }) => `
  <div class="form-control w-full ${extraClass}">
    ${label ? `
      <label class="label">
        <span class="label-text">${label}</span>
      </label>
    ` : ''}
    <input type="${type}" id="${id}" placeholder="${placeholder}" value="${value}" class="input input-bordered w-full" />
  </div>
`;
