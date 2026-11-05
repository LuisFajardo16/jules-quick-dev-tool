export const Button = ({ text, type = 'button', variant = 'primary', id, extraClass = '' }) => {
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    accent: 'btn-accent',
    ghost: 'btn-ghost',
    link: 'btn-link',
    error: 'btn-error',
    success: 'btn-success',
    warning: 'btn-warning',
    info: 'btn-info',
    outline: 'btn-outline',
  };

  return `
    <button type="${type}" id="${id || ''}" class="btn ${variants[variant] || 'btn-primary'} ${extraClass}">
      ${text}
    </button>
  `;
};
