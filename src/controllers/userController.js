const { User } = require("../db");
const { Op } =require (  "sequelize");
const { update, create } = require("../services/account.services");

/* Todo esto es usado por el  Admin   all this is used by the Admin */

/**
 * It's an async function that returns a promise that resolves to an array of users.
 * @param req - The request object.
 * @param res - The response object.
 * @param next - A function that you call to pass control to the next middleware function.
 */


async function getUsers(req, res, next) {
  try {
    console.log("entramos a usuarios");
    const users = await User.findAll({
      attributes: ["id", "name", "username", "email", "image"],
    });

    /* const users = query ? await User.find().sort({_id: -1}).limit(5) : await User.find();  */

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: "Erros al obtener los usuarios",
      error,
    });
  }
}



/**
 * Create a new user with the information provided in the request body, and return the new user as
 * JSON.
 * @param req - The request object.
 * @param res - the response object
 * @param next - The next middleware function in the stack.
 */
 function createUser(req, res, next) {

user = User

 create(req.body)
 .then(user => res.json(user))
 .catch(next)


}




/**
 * It's an async function that takes in a request, response, and next function as parameters. It then
 * tries to find a user by id and returns a 200 status code with the data and a message if the user is
 * found, or a 400 status code with a message if the user is not found. If there is an error, it
 * returns a 500 status code with the error.
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function in the stack.
 * @returns The data is being returned.
 */



async function getUserById(req, res, next) {
  try {
    let { id } = req.params;
    let data = await User.findOne({
      where: { id },
    });

    return data
      ? res.status(200).send({ data, message: "Id encontrado" })
      : res.status(400).send({ message: "No se encontro Id" });
  } catch (err) {
    res.status(500).json(err);
  }
}




//Put User

/**
 * It's an async function that calls a service function, then sends a response.
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function in the stack.
 */
async function putUser(req, res, next) {
  try {
      update(req.params.id, req.body)
      .then((user) => res.json(user))
      .catch(next);

    res.status(202).send({ message: "usuario actualizado Exitosamente" });
  } catch (err) {
    res.status(500).json(err);
  }
}

/// delete user

/**
 * It deletes a user from the database if the user exists.
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function in the stack.
 */
async function deleteUser(req, res, next) {
  try {
    let { id } = req.params;
    if (id) {
      const data = await User.findOne({
        where: { id },
      });
      if (data) {
        await data.destroy();
        res.status(200).send({ message: "usuario borrado Satisfactoriamente" });
      } else {
        res.status(400).send({ message: "usuario no Existe " });
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
}

/* buscar usuario por nombre */

/**
 * If the username is present in the query, then find the user with that username and send it back. If
 * the email is present in the query, then find the user with that email and send it back. If neither
 * is present, then send an error message.
 * @param req - The request object.
 * @param res - The response object.
 * @param next - A function to be called if the middleware function does not end the request-response
 * cycle. If the current middleware function does not end the request-response cycle, it must call
 * next() to pass control to the next middleware function. Otherwise, the request will be left hanging.
 */
async function searchUser(req, res, next) {
  try {
    let { username, email } = req.query;
    if (username) {
      const dataUsername = await User.findOne({
        where: { username },
      });
      res.status(200).send(dataUsername);
    } else {
      res.status(400).send({ message: "no se encontro Usuario " });
    }
    if (email) {
      const dataEmail = await User.findOne({
        where: { email },
      });
      res.status(200).send(dataEmail);
    } else {
      res.status(400).send({ message: "No se encontro Usuario" });
    }
  } catch (err) {
    res.status(500).send(err);
  }
}

module.exports = { getUsers, getUserById, putUser, deleteUser, searchUser, createUser };
