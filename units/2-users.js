import supertest from 'supertest';
const request = supertest('https://reqres.in/api/');
import { expect } from 'chai';

describe('GET Users', () => {
    it('GET /users-exist', async () => {                                              //name test
        const userData = await request
        .get(`users`)                                                                 //pull user data from API           
            console.log(`There are currently ${userData.total} users.`);              //prints current user count                   
                expect(userData.statusCode).to.eq(200);                               //validate status code
                expect(userData.body.data).to.not.be.empty;                           //confirm there data      
                expect(userData.body.total).to.not.eq(0);                             //confirm number of users is > 0
                expect(userData.body.total).to.eq(12);                                //confirm number of users               

    });
});


    
    
