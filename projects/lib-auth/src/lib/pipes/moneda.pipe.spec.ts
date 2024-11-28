import { MonedaPipe } from './moneda.pipe';

describe('MonedaPipe', () => {
  it('create an instance', () => {
    const pipe = new MonedaPipe();
    expect(pipe).toBeTruthy();
  });
  it('transform',()=>{
    const pipe = new MonedaPipe();
    const num=pipe.transform(1000,'.');
    expect(num).toBe('$ 1.000');
  });
  it('transform2',()=>{
    const pipe = new MonedaPipe();
    const num=pipe.transform(100,'.');
    expect(num).toBe('$ 100');
  });
});
