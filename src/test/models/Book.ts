import * as mongoose from "mongoose";
import BaseModel from "../../BaseModel";
import BasicRepo from "../../BasicRepo";
import { Hook, Hooks, HookTypes, Member, Method, Model } from "../../Decorators";
import { User } from "./User";

@Model<Book>()
export abstract class Book extends BaseModel {

    @Member({ type: String })
    public name: string;

    @Member({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
    public user: string|User;

    @Member({ type: Date })
    public created_at: Date;

    @Member({ type: Date })
    public updated_at: Date;

    @Hook(HookTypes.pre, Hooks.save)
    private async beforeSave() {
        if (!this.created_at) {
            this.created_at = new Date();
        }
        this.updated_at = new Date();
    }

}

export default new BasicRepo(Book);
