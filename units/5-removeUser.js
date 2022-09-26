import supertest from 'supertest';
const request = supertest('https://reqres.in/api/');
import { expect } from 'chai';

describe('DELETE Remove User', () => {                 //name test
    it('DELETE /remove-user', async () => {
        const deleteUser = await request
        .delete('users/2')                             //delete user with id:2
            expect(deleteUser.statusCode).to.eq(204);  //confirm successful delete
            expect(deleteUser.body).to.be.empty;       //validate that user entry has been removed/is blank 
            //console.log(res.body);
        });
    });
