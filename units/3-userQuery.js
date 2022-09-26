import supertest from 'supertest';
const request = supertest('https://reqres.in/api/');
import { expect } from 'chai';
import { validateJSON } from './index';

describe('GET User Query', () => {
    it('GET /query-user', () => {                                                        //name test
        const query = 'users?id=9';                                                      //define URL and query
            return request.get(query)                                                    //pull user data from API
            .then((res) => {
                expect(res.body.data).to.not.be.empty;
                //res.body.data.forEach((data) => {
                expect(res.body.data.id).to.eq(9);                                              //verify returned fields contain correct data
                expect(res.body.data.email).to.eq("tobias.funke@reqres.in");
                expect(res.body.data.first_name).to.eq("Tobias");
                expect(res.body.data.last_name).to.eq("Funke");
                expect(res.body.data.avatar).to.eq("https://reqres.in/img/faces/9-image.jpg");
                });
        });
    });
//});
            
    

    it('GET /is-valid-JSON', async () => {                                                      //name test
        return await request                                                                          
        .get('users?id=9')                                                                      //return query data on specific user
        .then((res) => {
            let JSONData = JSON.stringify(res.body.data);                                       //convert object to correct data type - JSON
                expect(validateJSON).to.be.instanceOf(Function);                                //confirm JSON validator
                expect(validateJSON(JSONData)).to.be.true;                                      //validate JSON data structure
                //console.log(typeof(JSONData));

        });
    });


    it('GET /bad-query-user', async () => {                                                     //name test
        const badQuery = 'users?page=2&id=400';                                                 //define URL and invalid query
            return await request.get(badQuery)                                                  //pull data from API
            .then((res) => {
                expect(res.statusCode).to.eq(404);                                              //verify invalid query
        });
    }); 
