import * as mongoose from "mongoose";
import BaseModel from "../../BaseModel";
import { Member, Method, Model } from "../../Decorators";
import ModelRepo from "../../ModelRepo";
import { User } from "./User";

@Model<Book>()
export abstract class Book extends BaseModel {

    @Member({ type: String })
    public name: string;

    @Member({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
    public user: string|User;

}

export class RBook extends ModelRepo<Book> {

    protected getModelName() {
        return "Book";
    }

}

const BookRepo = new RBook();
export default BookRepo;
