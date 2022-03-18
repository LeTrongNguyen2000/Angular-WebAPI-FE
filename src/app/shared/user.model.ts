export class User{
    id: number;
    code: string;
    firstName: string;
    lastName: string;
    position: string;
    title: string;
    departmentId: number;
    image: string;

    constructor(code:string = "",firstName:string ="",lastName:string ="",id:number = 0,position:string ="",
     title:string ="", departmentId: number = 0, image: string = ""){
        this.code = code;
        this.firstName = firstName;
        this.lastName = lastName;
        this.title = title;
        this.id = id;
        this.position = position;
        this.departmentId = departmentId;
        this.image = image;
    }
}