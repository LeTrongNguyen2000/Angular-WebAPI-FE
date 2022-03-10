export class User{
    userCode: string;
    userName: string;
    department: string;
    id: number;
    position: string;
    constructor(userCode:string = "",userName:string ="",department:string ="",id:number = 0,position:string =""){
        this.userCode = userCode;
        this.userName = userName;
        this.department = department;
        this.id = id;
        this.position = position;
    }
}