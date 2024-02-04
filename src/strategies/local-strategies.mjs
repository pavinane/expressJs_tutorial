import passport from "passport";
import LocalStrategy, { Strategy } from "passport-local";
import { mockUser } from "../utils/constent.mjs";

passport.serializeUser((user, done) => {
  console.log("inside serializeuser");
  console.log(user);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log("inside deserializeuser");
  console.log(`deserializeuser id : ${id}`);
  try {
    const findUser = mockUser.find((item) => item.id === id);
    if (!findUser) throw new Error("User not Found");
    done(null, findUser);
  } catch (error) {
    done(error, null);
  }
});

export default passport.use(
  new LocalStrategy(
    { usernameField: "username" },
    (username, password, done) => {
      console.log(mockUser);
      console.log(`username: ${username}`);
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
    }
  )
);
