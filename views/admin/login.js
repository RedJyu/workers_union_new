import { layoutAdmin } from './layout.js';

export const loginForm = ({ errors }) => {
  return layoutAdmin({
    content: `
      <div>
        <form method="POST">
          <input name="email" placeholder="email" />
          <input name="password" placeholder="hasło" />
          <button> Logowanie </button>
        </form>
        ${errors ? `<p class="error">${errors.join('<br>')}</p>` : ''}
      </div>
    `,
  });
};
