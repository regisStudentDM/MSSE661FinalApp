const partsService = new PartsService();
const assembliesService = new AssembliesService();
const assemblyListBuilder = new AssemblyListBuilder(assembliesService, partsService);

describe('PartsListBuilder App', () => {
  xit('should verify DOM rendering on class loading', () => {
    const renderSpy = spyOn(assemblyListBuilder, 'render');
    assemblyListBuilder.init();

    //The call to init() should call render().
    //Passing this test validates that init() was called successfully
    //and that render() was called successfully
    expect(renderSpy).toHaveBeenCalled();
  });

  xit('should verify assembly addition', async () => {

    //THE FOLLOWING assembly_part_name MUST BE IN THE PARTS LIST OR THIS TEST WILL FAIL
    //IF THE FOLLOWING combination of assembly_name and assemby_part_name is not unique the test will fail
    const newAssemblyRowReqBody = {
      assembly_name: 'testAssemblyName1',
      assembly_part_name: 'part 2 part for user 1',
      assembly_part_quantity: 1
    };

    const renderSpy = spyOn(assemblyListBuilder, 'render');

    // If the call to assembliesService.addAssemblyRow returns a valid response, then the assemblyListBuilder.render() function will be called
    // Passing the following expect test validates that the backend returned a valid response, as well as that the DOM render function was executed.
    // If an assembly rows already exists in the database that matches this criteria, a "DUPLICATE" message will pop up which is the correct behavior.
    var resp = await assemblyListBuilder.addAssemblyByObjectSpecification(newAssemblyRowReqBody);

    expect(renderSpy).toHaveBeenCalled();

  });

});
