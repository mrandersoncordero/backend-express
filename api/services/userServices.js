const { faker, da } = require('@faker-js/faker');
const boom = require('@hapi/boom');

// const Postgres = require('../../libs/Postgres');
const sequelize = require('../../libs/sequelize');

class UserService {
  constructor() {
    this.users = [];
    this.generate();
  }

  generate() {
    const limit = 10;

    for (let i = 0; i < limit; i++) {
      this.users.push({
        id: faker.string.uuid(),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        gender: faker.person.gender(),
        job: faker.person.jobDescriptor(),
      })
    }
  }

  async find() {
    const [data, metadata] = await sequelize.query('SELECT * FROM tasks');
    return data;
  }

  async findOne(id) {
    const user = this.users.find(item => item.id === id);

    if (!user) {
      throw boom.notFound('user not found');
    }
    return user;
  }

  async create(data) {
    const newUser = {
      id: faker.string.uuid(),
      ...data
    }

    this.users.push(newUser);
    return newUser;
  }

  async update(id, changes) {
    const index = this.users.findIndex(item => item.id === id);

    if (index === -1) {
      throw boom.notFound('user not found');
    }

    const user = this.users[index];
    this.users[index] = {
      ...user,
      ...changes
    };
    return this.users[index];
  }

  async delete(id) {
    const index = this.users.findIndex(item => item.id === id);

    if (index === -1) {
      throw boom.notFound('user not found');
    }

    this.users.splice(index, 1);
    return { id }
  }
}

module.exports = UserService
