const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const {
  refreshTokens,
  generateAccessToken,
  generateRefreshToken,
} = require('../src/utils/jwt-helpers');


describe('Assemblies API Service', function () {
  it.skip('should GET all assembly rows for given user id', function (done) {
    
    request_user_id = 1;

    const token = generateAccessToken(request_user_id, {
      // {id: 1, iat: wlenfwekl, expiredIn: 9174323 }
      expiresIn: 86400,
    });
    
    chai
      .request('http://localhost:3000')
      .get('/api/assemblies')
      .set('Authorization', `Bearer ${token}`)
      .end(function (err, resp) {
        expect(resp.status).to.be.eql(200);
        expect(resp.body).to.be.a('array');
        expect(resp.body.length).to.be.eql(5);
        done();
      });
  });

  it.skip('should POST a single assembly row for a given user', function (done) {
        
    request_user_id = 3;

    const token = generateAccessToken(request_user_id, {
      // {id: 1, iat: wlenfwekl, expiredIn: 9174323 }
      expiresIn: 86400,
    });
    
    const newAssemblyRow = {
      assembly_name: "assembly 2, user 3",
      assembly_part_name: "part 2 part for user 3",
      assembly_part_quantity: 20
    };
    const expected = { msg: 'Added assembly successfully!' };

    chai
      .request('http://localhost:3000')
      .post('/api/assemblies')
      .set('Authorization', `Bearer ${token}`)
      .send(newAssemblyRow)
      .end(function (err, resp) {
        expect(resp.status).to.be.eql(200);
        expect(resp.body).to.be.eql(expected);
        done();
      });
  });

  it('should DELETE a single assembly row for a given user', function (done) {
    request_user_id = 1;
    const token = generateAccessToken(request_user_id, {
      // {id: 1, iat: wlenfwekl, expiredIn: 9174323 }
      expiresIn: 86400,
    });

    const deleteAssemblyRow = {
        assembly_name: "test assembly 1",
        assembly_part_name: "part 1 part for user 1",
      };

    const expected = { msg: 'Deleted assembly row successfully.' };

    chai
      .request('http://localhost:3000')
      .post('/api/assemblies/deleteAssemblyByPrimaryKey')
      .set('Authorization', `Bearer ${token}`)
      .send(deleteAssemblyRow)
      .end(function (err, resp) {
        expect(resp.status).to.be.eql(200);
        expect(resp.body).to.be.eql(expected);
        done();
      });
  });

});
