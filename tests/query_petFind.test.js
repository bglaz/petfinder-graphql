const {server, mockedTypes} = require('./setup');

describe('petFind', () => {
  it('should return an error when missing required param `location`', async () => {
    expect.assertions(1);
    const result = await
      server.query(`
        query petFind {
          petFind {
            id
          }
        }
      `);

    expect(result).toMatchObject({errors: expect.any(Array)});
  });

  it('should return an error when invalid fields are requested', async () => {
    expect.assertions(1);
    const result = await
      server.query(`
        query petFind {
          petFind(location: "Somewhere") {
            id
            foo
          }
        }
      `);

    expect(result).toMatchObject({errors: expect.any(Array)});
  });

  it('should return an object of type `Pet` with all correct fields and types', async () => {

    const petResponse =  {
      id: mockedTypes['Int'],
      shelterId: mockedTypes['String'],
      shelterPetId: mockedTypes['String'],
      options: [mockedTypes['AnimalOptions'], mockedTypes['AnimalOptions']],
      age: mockedTypes['AnimalAge'],
      name: mockedTypes['String'],
      mix: mockedTypes['Boolean'],
      sex: mockedTypes['AnimalGender'],
      size: mockedTypes['AnimalSize'],
      description: mockedTypes['String'],
      breeds: [mockedTypes['String'], mockedTypes['String']]
    }

    expect.assertions(1);
    const result = await
      server.query(`
        query petFind {
          petFind(location: "Somewhere") {
            id
            shelterId
            shelterPetId
            options
            age
            name
            mix
            sex
            size
            description
            breeds
          }
        }
      `);


    const {data: {petFind: res}} = result;

    expect(res).toEqual(
      [
        petResponse, petResponse
      ]
    );
  });
});