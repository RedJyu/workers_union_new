import { layoutAdmin } from './layout.js';

export const signupForm = () => {
  return layoutAdmin({
    content: `
  <div>
    <form method="POST">
      <input name="name" placeholder="name" />
      <input name="email" placeholder="email" />
      <input name="password" placeholder="password" type="password" />
      <input name="passwordConfirmation" placeholder="confirm password" type="password" />
      <button>Register</button>
   </form>
 </div>`,
  });
};
