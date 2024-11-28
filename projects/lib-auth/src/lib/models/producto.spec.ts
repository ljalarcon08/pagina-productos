import { Producto } from './producto';

describe('Producto', () => {
  it('should create an instance', () => {
    expect(new Producto('id','name','marca',1234,'idCatalogo','img')).toBeTruthy();
  });
});
