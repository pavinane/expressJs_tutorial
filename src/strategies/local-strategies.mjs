import passport from "passport";
import LocalStrategy, { Strategy } from "passport-local";
import { mockUser } from "../utils/constent.mjs";
import { User } from "../mongoose/schemas/user.mjs";
import { comparedPassword } from "../utils/helpers.mjs";

passport.serializeUser((user, done) => {
  console.log("inside serializeuser");
  console.log(user);
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  console.log("inside deserializeuser");
  console.log(`deserializeuser id : ${id}`);
  try {
    // const findUser = mockUser.find((item) => item.id === id);
    const findUser = await User.findById(id);
    if (!findUser) throw new Error("User not Found");
    done(null, findUser);
  } catch (error) {
    done(error, null);
  }
});

export default passport.use(
  new LocalStrategy(async (username, password, done) => {
    console.log(mockUser);
    console.log(`username: ${username}`);
    console.log(`Password: ${password}`);
    try {
      // const findUser = mockUser.find((user) => user.userName === username);
      const findUser = await User.findOne({ userName: username });
      console.log("find", findUser);
      if (!findUser) throw new Error("User not found");
      if (!comparedPassword(password, findUser.password))
        throw new Error("Invalid Credentials");

      done(null, findUser);
    } catch (error) {
      done(error, null);
    }
  })
);
