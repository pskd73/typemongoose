import { Document } from "mongoose";

abstract class BaseModel implements Document {
    public abstract increment;
    public abstract model;
    public abstract remove;
    public abstract save;
    public abstract $isDefault;
    public abstract depopulate;
    public abstract equals;
    public abstract execPopulate;
    public abstract get;
    public abstract init;
    public abstract inspect;
    public abstract invalidate;
    public abstract isDirectModified;
    public abstract isInit;
    public abstract isModified;
    public abstract isSelected;
    public abstract markModified;
    public abstract modifiedPaths;
    public abstract populate;
    public abstract populated;
    public abstract set;
    public abstract toJSON;
    public abstract toObject;
    public abstract unmarkModified;
    public abstract update;
    public abstract validate;
    public abstract validateSync;
    public abstract errors;
    public abstract _id;
    public abstract isNew;
    public abstract schema;
    public abstract addListener;
    public abstract on;
    public abstract once;
    public abstract removeListener;
    public abstract removeAllListeners;
    public abstract setMaxListeners;
    public abstract getMaxListeners;
    public abstract listeners;
    public abstract emit;
    public abstract listenerCount;
    public abstract prependListener;
    public abstract prependOnceListener;
    public abstract eventNames;
    public abstract base;
    public abstract baseModelName;
    public abstract collection;
    public abstract db;
    public abstract discriminators;
    public abstract modelName;

    public getId(): string {
        return this._id;
    }
}

export default BaseModel;
