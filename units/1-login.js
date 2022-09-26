import supertest from 'supertest';
const request = supertest('https://reqres.in/api/');
import { expect } from 'chai';

describe('POST Login', () => {
    it('POST /login-successful', async () => {                    //creates credentials
        const data = {  
            email: "eve.holt@reqres.in",
            password: "cityslicka",
        };
        const loginValid = await request                             //store res using await to avoid using callback
        .post(`login`)                                               //URL 
        .send(data);                                                 //send credentials
        expect(loginValid.statusCode).to.eq(200);                    //verifies successful login
        expect(loginValid.body.token).to.eq("QpwL5tke4Pnpja7X4")     //verifies successful login token        
    });

    it('POST /login-fail', () => {                                   //create incomplete credentials
        const badData = {
            email: "eve.holt@reqres.in",
            password: "",
        };
        return request
       .post(`login`)                                                //URL 
       .send(badData)                                                //send incomplete credentials
       .then((res) => {                                              //return data from API in callback
            expect(res.statusCode).to.eq(400);                       //verifies failed login
            //console.log(res);  
        });
      });
    });
