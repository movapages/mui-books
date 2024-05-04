import { apiProjects } from './index';

describe('Api Project Service >> ', () => {
  beforeEach(() => {
    apiProjects.next([]);
  });

  it('It should be defined', () => {
    expect(apiProjects).toBeDefined();
  });

  it('It should has "asObservable" method', () => {
    expect('asObservable' in apiProjects).toBeDefined();
  });

  it('It should has "next" method', () => {
    expect('next' in apiProjects).toBeDefined();
  });

  it('It should has "getValue" method', () => {
    expect('getValue' in apiProjects).toBeDefined();
  });

  /*
  TO REFACTOR: default returned value test
   */
  it('It should return empty list', () => {
    const returnValue = apiProjects.getValue();
    expect(returnValue).toEqual([]);
  });
});
