const ASSEMBLIES_API = `${BASE_API_URL}/assemblies`; // http://localhost:3000/api/assemblies

class AssembliesService{
  getAssemblyRows = () => _get(ASSEMBLIES_API, OPTIONS_WITH_AUTH);

  addAssemblyRow = (formData) => _post(ASSEMBLIES_API, formData, DEFAULT_OPTIONS_WITH_AUTH);

  updateAssemblyRow = (formData) => _put(`${ASSEMBLIES_API}/updateAssemblyByPrimaryKey`, formData, DEFAULT_OPTIONS_WITH_AUTH);

  deleteAssemblyRow = (formData) => _post(`${ASSEMBLIES_API}/deleteAssemblyByPrimaryKey`, formData, DEFAULT_OPTIONS_WITH_AUTH);
}


