import { Rol } from "./rol";

export class Usuario {

    constructor(
        public id:number,
        public name:string,
        public email:string,
        public imagen:string,
        public password?:string,
        public google?:boolean,
        public create?:Date,
        public roles?:Rol[]){
    }


}
