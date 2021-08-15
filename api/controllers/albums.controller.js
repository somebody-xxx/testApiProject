"use strict";
import axios from "axios";

export class Users {
  async getListUsers() {
    try {
      const response = await axios.get("https://gorest.co.in/public/v1/users");
      return response;
    } catch (error) {
      console.info(`[ERROR]: ${error}`);
    }
  }

  getResponseStatus(response){
    return response.status;
  }

  getTotalUsers(response){
    return response.data.meta.pagination.total;
  }
}
