import { StatusToCssClassPipe } from './status-to-css-class.pipe';

describe('StatusToCssClassPipe', () => {
  it('create an instance', () => {
    const pipe = new StatusToCssClassPipe();
    expect(pipe).toBeTruthy();
  });
});
