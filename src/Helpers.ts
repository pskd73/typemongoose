import * as mongoose from "mongoose";
import ModelRepo from "./ModelRepo";
import BaseModel from "./BaseModel";

export function getClassName(constructor: () => any): string {
    return constructor.name;
}

export function CreateRepo<T extends mongoose.Document>(model: any): mongoose.Model<T> {
    return mongoose.model<T>(getClassName(model));
}
