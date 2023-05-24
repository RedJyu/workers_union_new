import { layoutAdmin } from './layout.js';

export const loginForm = () => {
  return layoutAdmin({
    content: `
  <div>
      <form method="POST">
        <input name="email" placeholder="email" />
        <input name="password" placeholder="hasło" />
        <button> Logowanie </button>
      </form>
  </div>
   `,
  });
};
