import db from "../models/index.js";

const {User}=db;

export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

export const createUsers = async (req, res) => {
  try {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password_hash: req.body.password,
      role: req.body.role
    });
    res.json(user);
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

export const updateUsers = async (req, res) => {
  try {
    await User.update(
      {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
      },
      {
        where: {
          id: req.params.id
        }
      }
    );

    res.json({
      message: "User updated"
    });
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};