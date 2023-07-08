const mongoose = require("mongoose");
const request = require("supertest");
require("dotenv").config();
const app = require("../app");
/* Connecting to the database before each test. */
beforeEach(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
});

/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.disconnect();
});

//JPH ==> JsonPlaceHolder api https://jsonplaceholder.typicode.com/users
describe("POST /auth/login", () => {
  it("should check if user exist with JPH api and return a token", async () => {
    const token = await request(app).post("/auth/login").send({
      fullName: process.env.FULLNAME,
      email: process.env.EMAIL,
    });
    expect(token.status).toBe(200);
  });
});
