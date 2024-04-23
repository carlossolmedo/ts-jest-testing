import { generateRandomId } from "../../../app/server-app/data/IdGenerator"

describe('IdGenerator test suite', () => {
  it('should return a random string', () => {
    const randomId = generateRandomId();
    expect(randomId.length).toBe(20);
  })
})