import supertest from 'supertest';
const request = supertest('https://reqres.in/api/');
import { expect } from 'chai';
import { validateJSON } from './index';

describe('POST Create User', () => {
    it('POST /create-user', async () => {                                   //create new user details for API
        const newUser = {
            "name":"gob",
            "job":"illusionist"
        };

            const createdUser = await request                               //store returned new users details in variable    
            .post('users')                                                  //send new user details
            .send(newUser)                                                  //send new user details
                const JSONPostData = JSON.stringify(createdUser)            //store returned new users details in variable JSON format  
                    expect(createdUser.statusCode).to.eq(201);              //verify successful creation of new user
                    expect(validateJSON(JSONPostData)).to.be.true;          //check new user details are correct data structure
                    expect(createdUser.body).to.deep.include(newUser);      //check new user details on API match the details sent
                    //console.log(createUser.body);                         //print details 

    });
});
