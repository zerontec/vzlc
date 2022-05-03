const { encry } = require("bcrypt");
const { user } = require("../db");



/* account search function   usefull  adapter to other search type   */
async function getAccount(id) {
  const account = await user.findByPk(id);
  if (!account) throw "Cuenta no encontrada";
  return account;
}

async function update(id, params) {
  const account = await getAccount(id);
  const user = User;
  // validate (if email was changed)
  if (
    params.email &&
    account.email !== params.email &&
    (await user.findOne({ where: { email: params.email } }))
  ) {
    throw 'Email "' + params.email + '" is already taken';
  }

  if (params.password) {
    params.passwordHash = await hash(params.password);
  }

  Object.assign(account, params);
  account.update = Date.now();
  await account.save();

  return basicDetails(account);
}

function basicDetails(account) {
  const { id, name, username, email, role, created, updated } = account;
  return { id, name, username, email, role, created, updated };
}

/* Funcion has */

async function hash(password) {
  return await encry.hash(password, 10);
}

module.exports = {
  update,
};
