import bcrypt from "bcrypt";

const users = [
  {
    name: "Admin User",
    email: "admin@email.com",
    profile: "https://robohash.org/stefan-01",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "John Doe",
    email: "john@email.com",
    profile: "https://robohash.org/stefan-02",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Jane Doe",
    email: "jane@email.com",
    profile: "https://robohash.org/stefan-03",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
