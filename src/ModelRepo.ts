import * as mongoose from "mongoose";
import BaseModel from "./BaseModel";
import { getClassName } from "./Helpers";

abstract class ModelRepo<T extends mongoose.Document> {

    public mName: string;
    public query: mongoose.Model<T>;

    constructor(model: { prototype: T, name: string }) {
        this.mName = model.name;
        this.query = mongoose.model<T>(this.mName);
    }

    public async create(options: object): Promise<T> {
        const newObj = new this.query(options);
        return newObj.save();
    }

}

export default ModelRepo;
