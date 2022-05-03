const { User, Role, Project } = require("../db");
const { Op } = (require = "sequelize");
const { servicesAccount } = require("../services/auth.services");

/* Todo esto es usado por el  Admin   all this is used by the Admin */

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

async function putUser(req, res, next) {
  try {
    servicesAccount.update(req.params.id, req.body)
      .then((account) => res.json(account))
      .catch(next);

    res.status(202).send({ message: "usuario actualizado Exitosamente" });
  } catch (err) {
    res.status(500).json(err);
  }
}

/// delete user

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

async function searchUser(req, res, next) {
  try {
    let { username, email } = req.query;
    if (username) {
      const dataUsername = await User.findOne({
        where: { username },
      });
      res.status(200).send(dataUsername);
    } else {
      res.status(400).send({ message: "no se encontro lo que buscas " });
    }
    if (email) {
      const dataEmail = await User.findOne({
        where: { email },
      });
      res.status(200).send(dataEmail);
    } else {
      res.status(400).send({ message: "No se encontro lo que buscaba" });
    }
  } catch (err) {
    res.status(500).send(err);
  }
}

module.exports = { getUsers, getUserById, putUser, deleteUser, searchUser };
