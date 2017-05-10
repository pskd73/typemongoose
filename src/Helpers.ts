import * as mongoose from "mongoose";
import BaseModel from "./BaseModel";
import ModelRepo from "./ModelRepo";

export function getClassName(constructor: () => any): string {
    return constructor.name;
}

export function CreateRepo<T extends mongoose.Document>(model: any): mongoose.Model<T> {
    return mongoose.model<T>(getClassName(model));
}
