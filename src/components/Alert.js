export const Alert = ({ type = 'info', message, icon }) => {
  const types = {
    info: 'alert-info',
    success: 'alert-success',
    warning: 'alert-warning',
    error: 'alert-error',
  };

  const defaultIcon = icon || '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';

  return `
    <div class="alert ${types[type]} shadow-sm my-2">
      ${defaultIcon}
      <span>${message}</span>
    </div>
  `;
};
