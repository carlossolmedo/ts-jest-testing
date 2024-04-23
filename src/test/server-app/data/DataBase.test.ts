import { DataBase } from '../../../app/server-app/data/DataBase';
import * as IdGenerator from '../../../app/server-app/data/IdGenerator';

type SomeTypeWithId = {
  id: string;
  name: string;
  color: string;
}

describe('DataBase test suite', () => {
  let sut: DataBase<SomeTypeWithId>;
  const fakeId = '1234';
  const fakeObject = {
    id: '',
    name: 'toto',
    color: 'green',
  };
  const fakeObject2 = {
    id: '',
    name: 'titi',
    color: 'green',
  };

  beforeEach(() => {
    sut = new DataBase<SomeTypeWithId>();
    // spy the external method to control the return value
    jest.spyOn(IdGenerator, 'generateRandomId').mockReturnValue(fakeId); // always return fakeId
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });
  it('should return id after insert some elements', async () => {
    const actual = await sut.insert(fakeObject);
    expect(actual).toBe(fakeId);
  });
  it('should get some element by id', async () => {
    const id = await sut.insert(fakeObject);
    const actual = await sut.getBy('id', id);
    expect(actual).toEqual(fakeObject);
  });
  it('should find all elements with the same property', async () => {
    await sut.insert(fakeObject);
    await sut.insert(fakeObject2);

    const actual = await sut.findAllBy('color', 'green');
    const expected = [fakeObject, fakeObject2];
    expect(actual).toEqual(expected); // return type [{}]
  });
  it('should update an element', async () => {
    const id = await sut.insert(fakeObject);
    const expectedName = 'tata';

    await sut.update(id, 'name', expectedName);
    const object = await sut.getBy('id', id);
    const actualName = object.name;

    expect(actualName).toBe(expectedName);
  });
  it('should delete an element', async () => {
    const id = await sut.insert(fakeObject);

    await sut.delete(id);
    const actual = await sut.getBy('id', id);

    expect(actual).toBeUndefined();
  });
  it('should get all elements', async () => {
    await sut.insert(fakeObject);
    await sut.insert(fakeObject2);
    const expected = [fakeObject, fakeObject2];

    const actual = await sut.getAllElements();
    expect(actual).toEqual(expected);
  });
});