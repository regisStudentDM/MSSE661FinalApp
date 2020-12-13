const doAddAssemblyRow = async (e) => {

    e.preventDefault();
    assemblyListBuilder._addAssemblyRowByUserFormInputs();
  };

const doDeleteAssemblyRow = async (e) => {

  e.preventDefault();
  assemblyListBuilder._deleteAssemblyRowByUserFormInputs();
};

const doUpdateAssemblyPartsList = async (e) => {
  e.preventDefault();
  assemblyListBuilder._updateAssemblyPartNameEditSelections();
};

const doUpdatPartsList = async (e) => {
  e.preventDefault();
  assemblyListBuilder._updatePartsListSelections();
};