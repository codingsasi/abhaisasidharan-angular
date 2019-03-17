import { NoSanitizePipe } from './no-sanitize.pipe';

describe('NoSanitizePipe', () => {
  it('create an instance', () => {
    const pipe = new NoSanitizePipe();
    expect(pipe).toBeTruthy();
  });
});
