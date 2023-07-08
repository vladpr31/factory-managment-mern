const mongoose = require("mongoose");
const request = require("supertest");
require("dotenv").config();
const app = require("../app");

/* Connecting to the database before each test. */
var token;
beforeAll(async () => {
  token = await request(app).post("/auth/login").send({
    fullName: process.env.FULLNAME,
    email: process.env.EMAIL,
  });
  expect(token.status).toBe(200);
  await mongoose.connect(process.env.MONGODB_URI);
});

/* Closing database connection after each test. */
afterAll(async () => {
  token = null;
  await mongoose.disconnect();
});

describe("GET /users/all", () => {
  it("should return all employees from the database", async () => {
    const data = await request(app)
      .get("/users/all")
      .set("Authorization", `Bearer ${token._body.access_token}`);
    expect(data.statusCode).toBe(200);
    expect(data.body.length).toBeGreaterThan(0);
  });
});

describe("GET /users/:id", () => {
  it("should return specific employee by his ID", async () => {
    const data = await request(app)
      .get(`/users/${token._body.id}`)
      .set("Authorization", `Bearer ${token._body.access_token}`);
    expect(data.statusCode).toBe(200);
    expect(data.body).toHaveProperty("_id");
    expect(data.body._id).toEqual(token._body.id);
  });
});

describe("POST /:id/newShift", () => {
  it("should create a new shift and add to database + to employees database", async () => {
    const data = await request(app)
      .post(`/users/${token._body.id}/newShift`)
      .set("Authorization", `Bearer ${token._body.access_token}`)
      .send({
        newShift: {
          date: new Date(),
          startingHour: new Date(),
          endingHour: new Date(),
          shiftWorkers: [],
        },
      });
    expect(data.statusCode).toBe(200);
    expect(data.body).toBe("Shift Created.");
  });
});
