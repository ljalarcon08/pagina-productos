import { Producto } from "./producto";

export class Carro {
    constructor(public email:string,public id?:string,public productos?:Producto[],createAt?:Date){

    }
}
