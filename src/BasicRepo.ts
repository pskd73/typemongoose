import * as mongoose from "mongoose";
import ModelRepo from "./ModelRepo";

class BasicRepo<T extends mongoose.Document> extends ModelRepo<T> {

    constructor(model: { prototype: T, name: string }) {
        super(model);
    }

}

export default BasicRepo;
