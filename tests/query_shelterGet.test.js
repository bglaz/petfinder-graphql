const {server, mockedTypes} = require('./setup');

describe('shelterGet', () => {
  it('should return an error when missing required param `id`', async () => {
    expect.assertions(1);
    const result = await
      server.query(`
        query shelterGet {
          shelterGet {
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
        query shelterGet {
          shelterGet(id: "42") {
            id
            foo
          }
        }
      `);

    expect(result).toMatchObject({errors: expect.any(Array)});
  });

  it('should return an object of type `Shelter` with all correct fields and types', async () => {

    const shelterResponse =  {
        id: mockedTypes['String'],
        name: mockedTypes['String'],
        address1: mockedTypes['String'],
        address2: mockedTypes['String'],
        city: mockedTypes['String'],
        state: mockedTypes['String'],
        zip: mockedTypes['String'],
        country: mockedTypes['String'],
        phone: mockedTypes['String'],
        fax: mockedTypes['String'],
        email: mockedTypes['String'],
        longitude: mockedTypes['Float'],
        latitude: mockedTypes['Float']
    }

    expect.assertions(1);
    const result = await
      server.query(`
        query shelterGet {
          shelterGet(id: "42") {
            id
            name
            address1
            address2
            city
            state
            zip
            country
            phone
            fax
            email
            longitude
            latitude
          }
        }
      `);


    const {data: {shelterGet: res}} = result;

    expect(res).toEqual(shelterResponse);
  });
});