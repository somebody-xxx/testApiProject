"use strict";
const user = require('../../../api/controllers/User/users.controller');
let response = [];

describe("List users", () => {
  beforeAll(async () => {
    response = await user.getUsersList();
  });
  it('should return status 200', () => {
    expect(user.getResponseStatus(response)).toBe(200, 'Status is not correct');
  });

  it('should return correct content-type', () => {
    expect(user.getResponseHeaders(response)['content-type']).toBe('application/json; charset=utf-8', 'Content-type is not correct');
  });

  it('should have valid response time', () => {
    expect(user.getResponseTime(response)).toBeLessThanOrEqual(0.500 , 'Response time is longer than expected');
  });

  it('shold not return empty list of users', () => {
    expect(user.getTotalUsers(response)).not.toBe(0, 'The user\'s list is empty');
  });

  it('should return only active users', async() => {
    expect(await user.checkListOfUsersByParameters('%C2%A0', 'active')).toBe(true, 'List contains not only users with active status');
  });

  it('should return only inactive users', async() => {
    expect(await user.checkListOfUsersByParameters('%C2%A0', 'inactive')).toBe(true, 'List contains not only users with active status');
  });

  it('should return only male users', async() => {
    expect(await user.checkListOfUsersByParameters('male', '%C2%A0')).toBe(true, 'List contains not only users with active status');
  });

  it('should return only female users', async() => {
    expect(await user.checkListOfUsersByParameters('female', '%C2%A0')).toBe(true, 'List contains not only users with active status');
  });


  it('should return only active male users', async() => {
    expect(await user.checkListOfUsersByParameters('male', 'active')).toBe(true, 'List contains not only users with active status');
  });

  it('should return only inactive male users', async() => {
    expect(await user.checkListOfUsersByParameters('male', 'inactive')).toBe(true, 'List contains not only users with active status');
  });

  it('should return only active female users', async() => {
    expect(await user.checkListOfUsersByParameters('female', 'active')).toBe(true, 'List contains not only users with active status');
  });

  it('should return only inactive female users', async() => {
    expect(await user.checkListOfUsersByParameters('female', 'inactive')).toBe(true, 'List contains not only users with active status');
  });
});
