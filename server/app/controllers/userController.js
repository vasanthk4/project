const { addUser, findUserByEmail, getWallet } = require('../models/user');

exports.login = (req, res) => {
  const {email, password} = req.body;
  findUserByEmail(email)
    .then((data) => {
      const user = data[0]
      if(user && user.password === password) {
        const {id, username, role} = user;
        res.json({id, username, role, success: true})
      }
      else 
        res.status(401).json({error: "Please enter a valid email or password"})
    })
    .catch((err) => res.status(401).json({error: "Please enter a valid email or password"}))
}

exports.register = (req, res) => {
  const {fullname, username, email, phno, dob, password, gender, pan, acc, ifsc, city, state, country, role} = req.body
  addUser({
    fullname, 
    username,
    email,
    phno,
    dob,
    password,
    gender,
    pan,
    acc,
    ifsc,
    city, 
    state,
    country,
    role
  })
    .then(() => {
      res.json({success: true, message: "User successfully created"})
    })
    .catch((err) => {
      console.log(err)
      res.status(400).json(err)
    })
}

exports.getWallet = (req, res) => {
  const {id} = req.params;
  getWallet(id)
    .then( (data) => {
      res.json({success: true, wallet: data.wallet})
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({success: false, error: "Error while fetching wallet data"})
    })
}