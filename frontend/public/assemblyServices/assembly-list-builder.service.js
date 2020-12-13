/**
 * @class AssemblyListBuilder
 *
 * Creates a list of assemblyRows and updates a list
 */

class AssemblyListBuilder {
  assemblyRows = [];
  assembliesService;
  partsService;

  constructor(assembliesService, partsService) {
    this.assembliesService = assembliesService;
    this.partsService = partsService;
  }

  init() {
    this.render();
  }

  _updatePartsListSelections = async () => {
    try {
      const parts = await this.partsService.getParts();

      for (const option of [...document.querySelector('#formInputPartName').options]) {
        option.remove();
      }
  
      var myNewAssemblyPartsList = document.getElementById("formInputPartName");
      var o;
  
      for (let index = 0; index < parts.length; index++) {
        o = document.createElement("option");
        o.value = parts[index].part_name;
        o.text = parts[index].part_name;
        myNewAssemblyPartsList.appendChild(o);
      }
  
      myNewAssemblyPartsList.selectedIndex = 0;
      
    } catch (error) {
      console.log(error);
    }
  };

  render = async () => {
    const assemblyRows = await this.assembliesService.getAssemblyRows();
  
    try {
      if (assemblyRows) {
        if (assemblyRows.msg) {
          this._renderMsg();
          this._updateAssemblyNameEditSelections();
          return;
        }
        this.assemblyRows = assemblyRows;

        this._renderList();
      } else {
        this._renderMsg();
      }
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  /**
   * DOM renderer for building the list row item.
   * Uses bootstrap classes with some custom overrides.
   *
   * {@link https://getbootstrap.com/docs/4.4/components/list-group/}
   * @example
   * <li class="list-group-item">
   *   <button class="btn btn-secondary" onclick="_deleteEventHandler(e, index)">X</button>
   *   <span>Part name</span>
   *   <span>pending</span>
   *   <span>date create</span>
   * </li>
   */
  _renderListRowItem = (assembly) => {
    const listGroupItem = document.createElement('li');
    listGroupItem.id = `assembly-${assembly.assembly_row_id}`; // part-1
    listGroupItem.className = 'list-group-item';

    const assemblyNameSpan = document.createElement('span');
    const assemblyName = document.createTextNode(assembly.assembly_name);
    assemblyNameSpan.appendChild(assemblyName);

    const assemblyPartNameSpan = document.createElement('span');
    const assemblyPartName = document.createTextNode(assembly.assembly_part_name);
    assemblyPartNameSpan.appendChild(assemblyPartName);

    const assemblyPartQuantitySpan = document.createElement('span');
    const assemblyPartQuantity = document.createTextNode(assembly.assembly_part_quantity);
    assemblyPartQuantitySpan.appendChild(assemblyPartQuantity);

    // add list item's details
    listGroupItem.append(assemblyNameSpan);
    listGroupItem.append(assemblyPartNameSpan);
    listGroupItem.append(assemblyPartQuantitySpan);

    return listGroupItem;
  };

  /**
   * DOM renderer for assembling the list items then mounting them to a parent node.
   */
  _renderList = () => {
    // get the "Loading..." text node from parent element
    const assembliessDiv = document.getElementById('assemblyRows');
    const loadingDiv = assembliessDiv.childNodes[0];
    const fragment = document.createDocumentFragment();
    const ul = document.createElement('ul');
    ul.id = 'assemblyRows-list';
    ul.className = 'list-group list-group-flush checked-list-box';

    this.assemblyRows.map((assembly) => {
      const listGroupRowItem = this._renderListRowItem(assembly);

      // add entire list item
      ul.appendChild(listGroupRowItem);
    });

    fragment.appendChild(ul);
    assembliessDiv.replaceChild(fragment, loadingDiv);

    this._updateAssemblyNameEditSelections();
  };

  _updateAssemblyNameEditSelections = () => {
    for (const option of [...document.querySelector('#formAssemblyToEditName').options]) {
      option.remove();
    }

    let uniqueAssemblyList = [];
    for (let index = 0; index < this.assemblyRows.length; index++) {
      if (!uniqueAssemblyList.includes(this.assemblyRows[index].assembly_name)) {
        uniqueAssemblyList.push(this.assemblyRows[index].assembly_name);
      }
    }

    var myAssemblyList = document.getElementById("formAssemblyToEditName");
    var o;

    for (let index = 0; index < uniqueAssemblyList.length; index++) {
      o = document.createElement("option");
      o.value = uniqueAssemblyList[index];
      o.text = uniqueAssemblyList[index];
      myAssemblyList.appendChild(o);
    }

    myAssemblyList.selectedIndex = 0;
    this._updateAssemblyPartNameEditSelections();
  }

  _updateAssemblyPartNameEditSelections = () => {
    var assemblyUniqueList = document.getElementById("formAssemblyToEditName");
    var assemblyName = assemblyUniqueList[assemblyUniqueList.selectedIndex].text;
    
    for (const option of [...document.querySelector('#formAssemblyPartName').options]) {
      option.remove();
    }

    let assemblyPartList = [];
    for (let index = 0; index < this.assemblyRows.length; index++) {
      if (this.assemblyRows[index].assembly_name == assemblyName) {
        assemblyPartList.push(this.assemblyRows[index].assembly_part_name);
      }
    }
    
    var myAssemblyPartNameList = document.getElementById("formAssemblyPartName");
    var o;

    for (let index = 0; index < assemblyPartList.length; index++) {
      o = document.createElement("option");
      o.value = assemblyPartList[index];
      o.text = assemblyPartList[index];
      myAssemblyPartNameList.appendChild(o);
    }

    myAssemblyPartNameList.selectedIndex = 0;
  }

  /**
   * DOM renderer for displaying a default message when a user has an empty list.
   */
  _renderMsg = () => {
    const assembliesDiv = document.getElementById('assemblyRows');
    const loadingDiv = assembliesDiv.childNodes[0];
    const listParent = document.getElementById('assemblyRows-list');
    const msgDiv = this._createMsgElement('Create some new assemblies!');

    if (assembliesDiv) {
      assembliesDiv.replaceChild(msgDiv, loadingDiv);
    } else {
      assembliesDiv.replaceChild(msgDiv, listParent);
    }
  };

  /**
   * Creates a message div block.
   *
   * @param {string} msg - custom message to display
   */
  _createMsgElement = (msg) => {
    const msgDiv = document.createElement('div');
    const text = document.createTextNode(msg);
    msgDiv.id = 'user-message';
    msgDiv.className = 'center';
    msgDiv.appendChild(text);

    return msgDiv;
  };

}
