import * as mongoose from "mongoose";
import BookRepo, { Book } from "./test/models/Book";
import UserRepo, { User } from "./test/models/User";

const init = async () => {
    console.log("connecting..");
    (mongoose as any).Promise = global.Promise;
    const connectionResponse = await mongoose.connect("mongodb://localhost/typemongoose");
    console.log("connected.");

    const allUsers = await UserRepo.query.find({});
    console.log(allUsers);

    const book = await BookRepo.query.findOne().populate("user");
    const user = book.user as User;
    console.log(user.getName());
};

init();
