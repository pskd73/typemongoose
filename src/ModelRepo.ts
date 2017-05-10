import * as mongoose from "mongoose";
import BaseModel from "./BaseModel";
import { getClassName } from "./Helpers";

abstract class ModelRepo<T extends mongoose.Document> {

    public query: mongoose.Model<T>;

    constructor() {
        this.query = mongoose.model<T>(this.getModelName());
    }

    public async create(options: object): Promise<T> {
        const newObj = new this.query(options);
        return newObj.save();
    }

    protected abstract getModelName(): string;
}

export default ModelRepo;
