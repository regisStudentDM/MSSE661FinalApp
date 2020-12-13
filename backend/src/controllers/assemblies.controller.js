const mysql = require('mysql');
const connection = require('../db-config');
const {
  GET_ALL_ASSEMBLIES,
  INSERT_ASSEMBLY_ROW,
  DELETE_ASSEMBLY_ROW_BY_USER_ID_ASSEMBLY_NAME_AND_ASSEMBLY_PART_NAME,
} = require('../queries/assemblies.queries');
const query = require('../utils/query');
const { serverError } = require('../utils/handlers');

/**
 * CRUD - Create, Read, Update, Delete
 * GET - Read
 * POST - Create
 * PUT - Update
 * DELETE - Delete
 */

// http://localhost:3000/assemblies
exports.getAllAssemblies = async (req, res) => {
    
  const con = await connection().catch((err) => {
    throw err;
  });

  const assemblies = await query(con, GET_ALL_ASSEMBLIES(req.user.id)).catch(
    serverError(res)
  );

  // [] === true, 0 === false
  if (!assemblies.length) {
    res.status(200).json({ msg: 'No assemblies available for this user.' });
    return;
  }
  else{
    res.json(assemblies);
    return;
  }
};

// http://localhost:3000/assemblies
exports.insertAssemblyRow = async (req, res) => {
  // verify valid token
  const user = req.user; // {id: 1, iat: wlenfwekl, expiredIn: 9174323 }

  // take result of middleware check
  if (user.id) {
    // establish connection
    const con = await connection().catch((err) => {
      throw err;
    });

    const assemblyName = mysql.escape(req.body.assembly_name);
    const assemblyPartName = mysql.escape(req.body.assembly_part_name);
    const result = await query(con, INSERT_ASSEMBLY_ROW(user.id, assemblyName, assemblyPartName, req.body.assembly_part_quantity)).catch(
      serverError(res)
    );

    if(result){
      if (result.affectedRows !== 1) {
        res.status(500).json({ msg: `Unable to add assembly: ${req.body.assembly_name}` });
        return;
      }
      else{
        res.status(200).json({ msg: 'Added assembly successfully!' });
        return;
      }    
    }
  }
  else{
    res.status(500).json({ msg: `Do not have permission to add this assembly: ${req.body.assembly_name}` });
    return;
  }

};

// http://localhost:3000/assemblies
exports.deleteAssemblyRowByUserIDAssemblyNameAssemblyPartName = async (req, res) => {
  // establish connection
  const con = await connection().catch((err) => {
    throw err;
  });

  const assemblyName = mysql.escape(req.body.assembly_name);
  const assemblyPartName = mysql.escape(req.body.assembly_part_name);

  // query delete part
  const result = await query(
    con,
    DELETE_ASSEMBLY_ROW_BY_USER_ID_ASSEMBLY_NAME_AND_ASSEMBLY_PART_NAME(req.user.id, assemblyName, assemblyPartName)
  ).catch(serverError(res));

  if(result){
    if (result.affectedRows !== 1) {
      res.status(500).json({ msg: `Unable to delete assembly row: ${req.body.assembly_name}` });
      return;
    }
    else{
      res.status(200).json({ msg: 'Deleted assembly row successfully.' });
      return;
    }
  } else{
    res.status(500).json({ msg: `Unable to delete assembly row: ${req.body.assembly_name}` });
    return;
    }

};
