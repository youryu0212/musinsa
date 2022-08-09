import { curry, filter, go, map, pipe, reduce } from './utils';

const testArr = [1, 2, 3, 4, 5];

describe('유틸 함수 단위 테스트', () => {
  it('curry 함수 테스트', () => {
    const add = curry((a, b) => a + b);
    const addFive = add(5);
    expect(addFive(3)).toBe(8);
    expect(addFive(5)).toBe(10);
    expect(addFive(7)).toBe(add(5, 7));
  });

  it('map 함수 테스트', () => {
    const mul = (num: number) => num * 2;
    const allArgsMulTwoNumber = map(mul);
    expect(map(mul, testArr)).toEqual([2, 4, 6, 8, 10]);
    expect(map(mul, testArr)).toEqual(allArgsMulTwoNumber(testArr));
    expect(map(mul, allArgsMulTwoNumber(testArr))).toEqual([4, 8, 12, 16, 20]);
  });

  it('filter 함수 테스트', () => {
    const isBiggerThanTwo = (num: number) => num > 2;
    const isBiggerThanFour = (num) => num > 4;
    const isAllArgsBiggerThanTwo = filter(isBiggerThanTwo);

    expect(filter(isBiggerThanTwo, testArr)).toEqual([3, 4, 5]);
    expect(filter(isBiggerThanTwo, testArr)).toEqual(isAllArgsBiggerThanTwo(testArr));
    expect(filter(isBiggerThanFour, isAllArgsBiggerThanTwo(testArr))).toEqual([5]);
  });

  it('reduce 함수 테스트', () => {
    const sum = (a: number, b: number) => a + b;
    const sumAllArgs = reduce(sum);

    expect(reduce(sum, testArr)).toBe(15);
    expect(reduce(sum, testArr)).toBe(sumAllArgs(testArr));
  });

  it('go 함수 테스트', () => {
    const sum = reduce((a: number, b: number) => a + b);
    const double = map((a: number) => a * 2);

    expect(go(testArr, double, sum)).toBe(30);
  });

  it('pipe 함수 테스트', () => {
    const mulTwoNumber = map((a: number) => a * 2);
    const isBiggerThanFive = filter((a: number) => a > 5);
    const sum = reduce((a: number, b: number) => a + b);

    const testFnc = pipe(mulTwoNumber, isBiggerThanFive, sum);
    expect(testFnc(testArr)).toBe(24);
  });
});
