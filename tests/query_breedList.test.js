const {server, mockedTypes} = require('./setup');

describe('breedList', () => {

    it('should return an error when missing required param `animal`', async () => {
      expect.assertions(1);
      const result = await
        server.query(`
          query breedList {
            breedList
          }
        `);
  
      expect(result).toMatchObject({errors: expect.any(Array)});
    });
  
    it('should return an error when `animal` param is not of type `AnimalType`', async () => {
      expect.assertions(1);
      const result = await
        server.query(`
          query breedList {
            breedList(animal: batbar)
          }
        `);
  
      expect(result).toMatchObject({errors: expect.any(Array)});
    });
  
    it('should return a list of strings', async () => {
      expect.assertions(1);
      const result = await
        server.query(`
          query breedList {
            breedList(animal: cat)
          }
        `);
      const {data: {breedList: res}} = result;
  
      expect(res).toEqual([mockedTypes['String'], mockedTypes['String']]);
    });
});