exports.CREATE_ASSEMBLIES_TABLE = `CREATE TABLE IF NOT EXISTS assemblies(
    assembly_row_id int NOT NULL AUTO_INCREMENT,
    user_id int NOT NULL,
    assembly_name varchar(255) NOT NULL,
    assembly_part_name varchar(255) NOT NULL,
    assembly_part_quantity int NOT NULL,
    PRIMARY KEY (assembly_row_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
          ON UPDATE CASCADE
          ON DELETE CASCADE,
    FOREIGN KEY (user_id, assembly_part_name) REFERENCES parts(user_id, part_name)
          ON UPDATE CASCADE
          ON DELETE CASCADE,
    UNIQUE KEY (user_id, assembly_name, assembly_part_name)
  )`;
  
  exports.GET_ALL_ASSEMBLIES = (userId) => `SELECT * FROM assemblies WHERE user_id = ${userId}`;

/*   exports.GET_ASSEMBLY_ROW_ID_BY_USER_ID_ASSEMBLY_NAME_AND_ASSEMBLY_PART_NAME = (userId, assemblyName, assemblyPartName) =>
  `SELECT assembly_row_id FROM assemblies WHERE user_id = ${userId} AND assembly_name = ${assemblyName} AND assembly_part_name = ${assemblyPartName}`;
  
  exports.GET_ASSEMBLY_ROW_BY_USER_ID_AND_ROW_ID = (userId, assemblyRowId) =>
    `SELECT * FROM assemblies WHERE user_id = ${userId} AND assembly_row_id = ${assemblyRowId}`;
 */  
  exports.INSERT_ASSEMBLY_ROW = (userId, assemblyName, assemblyPartName, assemblyPartQuantity) =>
    `INSERT INTO assemblies (user_id, assembly_name, assembly_part_name, assembly_part_quantity) VALUES (${userId}, ${assemblyName}, ${assemblyPartName}, ${assemblyPartQuantity})`;
  
  exports.DELETE_ASSEMBLY_ROW_BY_USER_ID_ASSEMBLY_NAME_AND_ASSEMBLY_PART_NAME = (userId, assemblyName, assemblyPartName) =>
    `DELETE FROM assemblies WHERE user_id = ${userId} AND assembly_name = ${assemblyName} and assembly_part_name = ${assemblyPartName}`;
  