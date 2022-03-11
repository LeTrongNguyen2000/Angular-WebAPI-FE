export class User{
    id: number;
    code: string;
    firstName: string;
    lastName: string;
    position: string;
    title: string;
    name: string;
    departmentId: number;

    constructor(code:string = "",firstName:string ="",lastName:string ="",id:number = 0,position:string ="",
     title:string ="", departmentId = 0, name: string = ""){
        this.code = code;
        this.firstName = firstName;
        this.lastName = lastName;
        this.title = title;
        this.id = id;
        this.position = position;
        this.departmentId = departmentId;
        this.name = name;
    }
}