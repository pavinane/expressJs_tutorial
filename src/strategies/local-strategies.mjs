import passport from "passport";
import { Strategy } from "passport-local";
import { mockUser } from "../utils/constent.mjs";

export default passport.use(
  new Strategy((username, password, done) => {
    console.log(mockUser);
    console.log(`UserName: ${username}`);
    console.log(`Password: ${password}`);
    try {
      const findUser = mockUser.find((user) => user.userName === username);
      if (!findUser) throw new Error("User not found");
      if (findUser.password !== password)
        throw new Error("Invalid Credentials");
      done(null, findUser);
    } catch (error) {
      done(error, null);
    }
  })
);
