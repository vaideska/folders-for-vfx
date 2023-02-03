import { makeAutoObservable } from "mobx";
import { IFolder } from "../types/types";

class Folders {
  foldersData: IFolder[] = [
    {
      id: '1',
      name: 'ASSETS',
      parentId: null
    },
    {
      id: '2',
      name: 'INFC',
      parentId: '1'
    },
    {
      id: '6',
      name: 'RND',
      parentId: null
    },
    {
      id: '3',
      name: 'INFC_0010',
      parentId: '2'
    },
    {
      id: '4',
      name: 'INFC_0020',
      parentId: '2'
    },
    {
      id: '5',
      name: 'INFC_0030',
      parentId: '2'
    }
  ];

  constructor() {
    makeAutoObservable(this);
  }

  addFolder(folder: IFolder) {
    this.foldersData.push(folder);
  }

  removeFolder(folder: IFolder) {
    const deleteId = [folder.id];
    this.foldersData.forEach((folderData) => {
      if (folderData.parentId === folder.id) {
        deleteId.push(folderData.id);
      }
    });

    this.foldersData = this.foldersData.filter(folder => {
      if (deleteId.includes(folder.id)) return false;
      if (folder.parentId && deleteId.includes(folder.parentId)) return false;
      return true;
    });
    console.log(this.foldersData.length);
  }

  get level1() {
    return this.foldersData.filter(folder => folder.parentId === null);
  }

  getLevelChild(parentId: string) {
    return this.foldersData.filter(folder => folder.parentId === parentId);
  }

}
const foldersStore = new Folders();
export default foldersStore;
