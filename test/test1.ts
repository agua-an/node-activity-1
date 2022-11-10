/// DO NOT MODIFY THESE FILE
import { describe, it } from "mocha";
import { expect } from "chai";
import { FileWatcherEventKind } from "typescript";
import fetch from "node-fetch";
import { User } from "@prisma/client";

const PORT = 3000

const expectedOuput = {
  email: 'pandanj@aclcbukidnon',
  password: 'pandanGwapo'
}

describe("1. User", async () => {
  const listOfUsers  = await (await fetch(`http://localhost:${3000}/users`)).json() as User[]
  const user = listOfUsers.filter(i => i.email == 'pandanj@aclcbukidnon.com')
  it("Email: pandanj@aclcbukidnon.com", async() => {
    expect(user[0].email).equals('pandanj@aclcbukidnon.com')
  });

  it("Password: pandanGwapo", async() => {
    expect(user[0].email).equals('pandanGwapo')
  });

});
