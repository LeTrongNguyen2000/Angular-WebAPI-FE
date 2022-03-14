export class Department {
    id: number;
    name: string;
    parentId: number;
    constructor(id: number = 0, name: string = "", parentId: number = 0){
        this.id = id;
        this.name = name;
        this.parentId = parentId;
    }
}