import { Usuario } from './usuario';

describe('Usuario', () => {
  it('should create an instance', () => {
    expect(new Usuario(1,'name','email','imagen')).toBeTruthy();
  });
});
