const  bcrypt  = require('bcrypt');
const { User } = require("../db");




async function create(params){



if(await User.findOne({where: {email:params.email}})){

throw 'Email " ' + params.email + ' " is Alredy registered'


}else if(await User.findOne({where:{username:params.username}})){

  throw 'Username " ' + params.username + ' " is Alredy registered'


}

const user = new User(params); 
user.verified = Date.now();


//has password
user.passwordHash = await  hash(params.password)

//save User
await user.save()
return basicDetails(user)


}




/* account search function   usefull  adapter to other search type   */
/**
 * Get an account by id, if it doesn't exist, throw an error.
 * @param id - The id of the account to get.
 * @returns The account object.
 */
async function getAccount(id) {
 
  const account = await User.findByPk(id);
  if (!account) throw "Cuenta no encontrada";
  return account;
}

/**
 * If the email is changed, check if it's already taken, if it is, throw an error, otherwise, update
 * the account.
 * @param id - the id of the account to update
 * @param params - {
 * @returns The account object with the updated values.
 */
async function update(id, params) {
  const account = await getAccount(id);
 
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

/**
 * It takes an object with a bunch of properties and returns an object with a subset of those
 * properties.
 * @param account - The account object that is being passed in.
 * @returns An object with the properties id, name, username, email, role, created, and updated.
 */
function basicDetails(user) {
  const { id, name, username, email, role, created, updated } = user;
  return { id, name, username, email, role, created, updated };
}

/* Funcion has */

/**
 * It takes a password, hashes it, and returns the hashed password.
 * @param password - The password to be hashed.
 * @returns A promise.
 */
async function hash(password) {
  return await bcrypt.hash(password, 10);
}

module.exports = {
  update,
  create
};
