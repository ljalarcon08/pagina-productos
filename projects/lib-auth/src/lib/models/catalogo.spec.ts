import { Catalogo } from './catalogo';

describe('Catalogo', () => {
  it('should create an instance', () => {
    expect(new Catalogo('id','name','url')).toBeTruthy();
  });
});
