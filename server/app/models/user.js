const {pool} = require('../../config/configDB');

module.exports.createUserTable = (localPool) => {
  return new Promise((resolve, reject) => {
    const query = "create table if not exists user(" + 
    "id varchar(255)," +
    "fullname varchar(50)," + 
    "username varchar(20)," +
    "email varchar(50) unique," + 
    "phno bigint," + 
    "dob date," + 
    "password varchar(20)," + 
    "gender char(1)," + 
    "pan varchar(20)," + 
    "acc varchar(20)," + 
    "ifsc varchar(20)," + 
    "city varchar(20)," + 
    "state varchar(20)," +
    "country varchar(20)," +
    "wallet float," +
    "role varchar(10))";
    localPool.query(query, (err, data) => {
      if(err) reject(err)
      else {
        console.log("User Table Created!")
        resolve(data)
      }
    })
  })
}

module.exports.addUser = (user) => {
  return new Promise((resolve, reject) => {
    const {fullname, username, email, phno, dob, password, gender, pan, acc, ifsc, city, state, country, role} = user
    if(fullname && username && email && phno && dob && password && gender && pan && acc && ifsc && city && state && country) {
      const Role = role?role:"Customer"
      const query = `insert into user values( uuid(),'${fullname}', '${username}', '${email}', ${phno}, '${dob}', '${password}', '${gender}', '${pan}', '${acc}', '${ifsc}', '${city}', '${state}', '${country}', 0.0, '${Role}')`;
      pool.query(query, (err, data) => {
        if(err) reject(err)
        else resolve(data)
      })
    }
    else reject({success: false, errorMessage: "Please enter valid user details"})
  })
}
  

module.exports.findUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    const query = `select * from user where email='${email}' limit 1`
    pool.query(query, (err, data) => {
      if(err) reject(err)
      else resolve(data)
    })
  })
}

module.exports.findUserById = (id) => {
  return new Promise((resolve, reject) => {
    const query = `select * from user where id='${id}' limit 1`
    pool.query(query, (err, data) => {
      if(err) reject(err)
      else resolve(data)
    })
  })}

module.exports.updateWallet = (amount, id) => {
  return new Promise((resolve, reject) => {
    const query = `update user set wallet=${amount} where id='${id}' limit 1`
    pool.query(query, (err, data) => {
      if(err) reject(err)
      else resolve(data)
    })
  })
}

module.exports.getWallet = (id) => {
  return new Promise((resolve, reject) => {
    const query = `select wallet from user where id='${id}' limit 1`
    pool.query(query, (err, data) => {
      if(err) reject(err)
      else resolve(data[0])
    })
  })
}