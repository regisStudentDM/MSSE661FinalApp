const ASSEMBLIES_API = `${BASE_API_URL}/assemblies`; // http://localhost:3000/api/assemblies

class AssembliesService{
  getAssemblies = () => _get(ASSEMBLIES_API, OPTIONS_WITH_AUTH);
  }


