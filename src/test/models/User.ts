import * as mongoose from "mongoose";
import BaseModel from "../../BaseModel";
import { Member, Method, Model } from "../../Decorators";
import ModelRepo from "../../ModelRepo";

@Model<User>()
export abstract class User extends BaseModel {

    @Member({ type: String })
    public name: string;

    @Member({ type: Date })
    public dob: Date;

    @Member({ type: Boolean })
    public isMale: boolean;

    @Method()
    public getName(): string {
        return this.name;
    }

    @Method()
    public async updateName(name): Promise<string> {
        this.name = name;
        await this.save();
        return name;
    }

}

export class RUser extends ModelRepo<User> {

    public async getAllObjects(): Promise<User[]> {
        return this.query.find({});
    }

}

export default new RUser(User);
