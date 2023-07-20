// Import all named exports attached to a usersAPI object
// This syntax can be helpful documenting where the methods come from
import * as usersAPI from "./users-api";

async function signUp(userData) {
  // Delegate the network request code to the users-api.js API module
  // which will ultimately return a JSON Web Token (JWT)
  const token = await usersAPI.signUp(userData);
  // Returning whatever is sent back by the server
  return token;
}

async function checkUsername(username) {
  const result = await usersAPI.checkUsername(username);
  return result;
}

export { signUp, checkUsername };