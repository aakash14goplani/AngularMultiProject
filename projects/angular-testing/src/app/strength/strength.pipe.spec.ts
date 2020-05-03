import { StrengthPipe } from './strength.pipe';

describe('StrengthPipe', () => {

  it('should create an instance', () => {
    const pipe = new StrengthPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return `weak` if value is less than 10', () => {
    const pipe = new StrengthPipe();
    const result: string = pipe.transform(5);
    expect(result).toEqual('5 (weak)');
  });

  it('should return `strong` if value is anywhere between 10 to 20', () => {
    const pipe = new StrengthPipe();
    const valuePassed: number = 12;
    const expectedResult: string = valuePassed + ' (strong)';
    const result: string = pipe.transform(valuePassed);
    expect(result).toEqual(expectedResult);
  });

  it('should return `unbelievable` if value is greater than or equal to 20', () => {
    const pipe = new StrengthPipe();
    const valuePassed: number = 20;
    const expectedResult: string = valuePassed + ' (unbelievable)';
    const result: string = pipe.transform(valuePassed);
    expect(result).toEqual(expectedResult);
  });
});
