export class Producto {
    constructor(public id:string,
        public name:string,
        public marca:string,
        public prize:number,
        public idCatalogo:string,
        public img:string,
        public cantidad?:number
    ){

    }
}
