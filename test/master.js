import supertest from 'supertest';
const request = supertest('https://reqres.in/api/');
import { expect } from 'chai';
import { validateJSON } from './index';

describe('POST Login', () => {
    it('POST /login-successful', async () => {                       //creates credentials
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

describe('GET Users', () => {
    it('GET /users-exist', async () => {                                              //name test
        const userData = await request
        .get(`users`)                                                                 //pull user data from API           
            console.log(`There are currently ${userData.body.total} users.`);         //prints current user count                   
                expect(userData.statusCode).to.eq(200);                               //validate status code
                expect(userData.body.data).to.not.be.empty;                           //confirm there data      
                expect(userData.body.total).to.not.eq(0);                             //confirm number of users is > 0
                expect(userData.body.total).to.eq(12);                                //confirm number of users               
        });
    });

describe('GET User Query', () => {
    it('GET /query-user', async () => {                                                         //name test
        const query = 'users?page=2&id=9';                                                      //define URL and query
            return await request.get(query)                                                     //pull user data from API
                .then((res) => {
                    //res.body.data.forEach((data) => {
                    expect(res.body.data.id).to.eq(9);                                          //verify returned fields contain correct data
                    expect(res.body.data.email).to.eq("tobias.funke@reqres.in");
                    expect(res.body.data.first_name).to.eq("Tobias");
                    expect(res.body.data.last_name).to.eq("Funke");
                    expect(res.body.data.avatar).to.eq("https://reqres.in/img/faces/9-image.jpg");
            }); 
        });
    });
             
    it('GET /is-valid-JSON', async () => {                               //name test
        return await request                                                                          
            .get('users?id=9')                                           //return query data on specific user
            .then((res) => {
                let JSONData = JSON.stringify(res.body.data);            //convert object to correct data type - JSON
                    expect(validateJSON).to.be.instanceOf(Function);     //confirm JSON validator
                    expect(validateJSON(JSONData)).to.be.true;           //validate JSON data structure
                    //console.log(typeof(JSONData));
        });
    });
    
    
    it('GET /bad-query-user', async () => {                                 //name test
        const badQuery = 'users?page=2&id=400';                             //define URL and invalid query
            return await request.get(badQuery)                              //pull data from API
                .then((res) => {
                    expect(res.statusCode).to.eq(404);                      //verify invalid query
         });
    }); 
    
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

describe('DELETE Remove User', () => {                     //name test
    it('DELETE /remove-user', async () => {
        const deleteUser = await request
            .delete('users/2')                             //delete user with id:2
                expect(deleteUser.statusCode).to.eq(204);  //confirm successful delete
                expect(deleteUser.body).to.be.empty;       //validate that user entry has been removed/is blank 
                //console.log(res.body);
    });
});
    
