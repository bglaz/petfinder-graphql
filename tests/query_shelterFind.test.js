const {server, mockedTypes} = require('./setup');

describe('shelterFind', () => {
  it('should return an error when missing required param `location`', async () => {
    expect.assertions(1);
    const result = await
      server.query(`
        query shelterFind {
          shelterFind {
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
        query shelterFind {
          shelterFind(location: "Somewhere") {
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
        query shelterFind {
          shelterFind(location: "Somewhere") {
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


    const {data: {shelterFind: res}} = result;

    expect(res).toEqual(
      [
       shelterResponse,shelterResponse
      ]
    );
  });
});