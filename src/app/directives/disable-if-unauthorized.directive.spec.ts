import { DisableIfUnauthorizedDirective } from './disable-if-unauthorized.directive';

describe('DisableIfUnauthorizedDirective', () => {
  it('should create an instance', () => {
    const directive = new DisableIfUnauthorizedDirective(null, null);
    expect(directive).toBeTruthy();
  });
});
