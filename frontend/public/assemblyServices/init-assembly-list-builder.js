const partsService = new PartsService();
const assembliesService = new AssembliesService();
const assemblyListBuilder = new AssemblyListBuilder(assembliesService, partsService);

assemblyListBuilder.init();