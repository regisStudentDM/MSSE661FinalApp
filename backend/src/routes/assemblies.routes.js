const express = require('express');
const {
  getAllAssemblyRows,
  insertAssemblyRow,
  deleteAssemblyRowByUserIDAssemblyNameAssemblyPartName,
} = require('../controllers/assemblies.controller');
const canAccess = require('../middleware/auth.middleware');

const assembliesRoutes = express.Router();
/**
 * Express routes for Assemblies.
 *
 * RESTful endpoints make for easily adding to existing API features.
 */

/**
 * Routes for all assemblies. Evaluates to `/assemblies/`.
 */
assembliesRoutes.get('/', canAccess, getAllAssemblyRows);

assembliesRoutes.post('/', canAccess, insertAssemblyRow);

assembliesRoutes.post('/deleteAssemblyByPrimaryKey', canAccess, deleteAssemblyRowByUserIDAssemblyNameAssemblyPartName);


module.exports = assembliesRoutes;
