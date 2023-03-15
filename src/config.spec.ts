import { createConfig } from './config';

describe('config', () => {
  it('should have environment set to test', async () => {
    // arrange
    const sut = await createConfig();

    // act & assert
    expect(sut.environment).toBe('test');
  });
});
