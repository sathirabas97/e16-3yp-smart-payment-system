'use strict'

const client = require('../services/mysql')

exports.registering = async (user, callback) => {
  if (user) {
    // sql query to register a user
    const sql_regi = `INSERT INTO EMPLOYEE(NIC,Email, Password, FName, LName, Role, Activation_Key) VALUES ('${user.NIC}', '${user.email}', '${user.password}', '${user.fname}', '${user.lname}', '${user.role}', '${user.activation_key}');`
    
    // executing the query
    await client.sendQuery(sql_regi, (err, result) => {
      if(err) {
        if (err.code != "ER_DUP_ENTRY")
          console.error(`SQLQueryError: ${err.sqlMessage}`)
        
        callback(err.code)
      } else {
        // console.log(`User ${user.email} was successfully registered!`)
        callback(null)
      }
    })
  }
}

exports.findUser = async (email, callback) => {
  if (email) {
    // sql query to find a user
    const sql_find = `SELECT * FROM EMPLOYEE WHERE Email = '${email}';`

   // executing the query
    await client.sendQuery(sql_find, (err, result) => {
      // sql error happend
      if (err) {
        console.error(`SQLQueryError: ${err.sqlMessage}`)
        callback(err.code, null)
        // If the requested user is there or not 
      } else if (!err && result.length <= 1) {
        callback(null, result)
        // Multiple user have registered using same email
      } else {
        console.error(`Duplicate instance found on user ${email}`)
        callback('Multiple users found', null)
      }
    })
  }
}