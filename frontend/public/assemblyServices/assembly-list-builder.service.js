/**
 * @class AssemblyListBuilder
 *
 * Creates a list of assemblies and updates a list
 */

class AssemblyListBuilder {
  assemblies = [];
  assembliesService;

  constructor(assembliesService) {
    this.assembliesService = assembliesService;
  }

  init() {
    this.render();
  }

  render = async () => {
    const assemblies = await this.assembliesService.getAssemblies();
  
    try {
      if (assemblies) {
        if (assemblies.msg) {
          this._renderMsg();
          this._updateAssemblyNameEditSelections();
          return;
        }
        this.assemblies = assemblies;

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

    return listGroupItem;
  };

  /**
   * DOM renderer for assembling the list items then mounting them to a parent node.
   */
  _renderList = () => {
    // get the "Loading..." text node from parent element
    const assembliessDiv = document.getElementById('assemblies');
    const loadingDiv = assembliessDiv.childNodes[0];
    const fragment = document.createDocumentFragment();
    const ul = document.createElement('ul');
    ul.id = 'assemblies-list';
    ul.className = 'list-group list-group-flush checked-list-box';

    this.assemblies.map((assembly) => {
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

    var myList = document.getElementById("formAssemblyToEditName");
    var o;

    for (let index = 0; index < this.assemblies.length; index++) {
      o = document.createElement("option");
      o.value = this.assemblies[index].assembly_name;
      o.text = this.assemblies[index].assembly_name;
      myList.appendChild(o);
    }

    myList.selectedIndex = 0;
  }

  /**
   * DOM renderer for displaying a default message when a user has an empty list.
   */
  _renderMsg = () => {
    const assembliesDiv = document.getElementById('assemblies');
    const loadingDiv = assembliesDiv.childNodes[0];
    const listParent = document.getElementById('assemblies-list');
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
