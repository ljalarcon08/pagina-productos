import { Catalogo } from '../../../../lib-auth/src/lib/models/catalogo';
import { BuscaCatalogoPipe } from './busca-catalogo.pipe';

describe('BuscaCatalogoPipe', () => {
  let catalogos:Catalogo[]=[{id:'1',name:'name',url:'url'},{id:'2',name:'name',url:'url'}];

  it('create an instance', () => {
    const pipe = new BuscaCatalogoPipe();
    expect(pipe).toBeTruthy();
  });
  it('transform',()=>{
    const pipe = new BuscaCatalogoPipe();
    const name=pipe.transform('1',catalogos);
    expect(name).toBe(catalogos[0].name);
  });
  it('transform2',()=>{
    const pipe = new BuscaCatalogoPipe();
    const name=pipe.transform('3',catalogos);
    expect(name).toBe('');
  });
});
