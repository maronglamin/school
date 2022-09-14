import axios from 'axios';

export class QueryDB {
  static serverURL = 'http://localhost:3001';

  // get all student data
  static getAllStudents() {
    let dataURL = `${this.serverURL}/users`;
    return axios.get(dataURL);
  }

  // user to db.json
  static createUsers(user) {
    let dataURL = `${this.serverURL}/users`;
    return axios.post(dataURL, user);
  }

  static getStudent(userId) {
    let dataURL = `${this.serverURL}/users/${userId}`;
    return axios.get(dataURL);
  }

  static updateUser(user, userId) {
    let dataURL = `${this.serverURL}/users/${userId}`;
    return axios.put(dataURL, user);
  }

  static deleteUser(userId) {
    let dataURL = `${this.serverURL}/users/${userId}`;
    return axios.delete(dataURL);
  }
}
