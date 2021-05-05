import { StrengthPipe } from './strength.pipe';

describe('Strength Pipe', () => {
  let sut: StrengthPipe;

  const makeSut = () => new StrengthPipe();

  beforeEach(() => sut = makeSut())

  it('Should display weak if strenght is 5', () => {
    const result = sut.transform(5);
    expect(result).toEqual('5 (weak)');
  })

  it('Should display strong if strenght is 10', () => {
    const result = sut.transform(10);
    expect(result).toEqual('10 (strong)');
  })

  it('Should display unbelievable if strenght is 20', () => {
    const result = sut.transform(20);
    expect(result).toEqual('20 (unbelievable)');
  })
})
