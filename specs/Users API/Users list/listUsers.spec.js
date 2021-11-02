"use strict";
const Users = require('../../../api/controllers/users.controller');
const user = new Users();
let response = [];

describe("List users", () => {
  beforeAll(async () => {
    response = await user.getListUsers();
  });
  it('should return status 200', async () => {
    expect(user.getResponseStatus(response)).toBe(200, 'Status is not correct');
  });

  it('shold return not empty list of users', async () => {
    expect(user.getTotalUsers(response)).not.toBe(0, 'The user\'s list is empty');
  });

  it('should return only active users', async() => {

  });

  it('should return only inactive users', async() => {

  });

  it('should return only male users', async() => {

  });

  it('should return only female users', async() => {

  });


  it('should return only active male users', async() => {

  });

  it('should return only inactive male users', async() => {

  });

  it('should return only active female users', async() => {

  });

  it('should return only inactive female users', async() => {

  });
});
