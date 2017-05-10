import { Document, model, Schema } from "mongoose";

const SchemaStore = {};

export function Model<T extends Document>() {
    return (constructor: any) => {
        const modelName = (constructor as () => void).name;
        const schema = new Schema(SchemaStore[modelName].schema);
        for(const method in SchemaStore[modelName].methods) {
            schema.methods[method] = SchemaStore[modelName].methods[method];
        }
        for(const method in SchemaStore[modelName].staticMethods) {
            schema.statics[method] = SchemaStore[modelName].staticMethods[method];
        }
        model<T>(modelName, schema);
    };
}

export function Member(options: object) {
    return (target: object, name: string) => {
        const modelName = (target as object).constructor.name;
        if (!SchemaStore[modelName]) {
            SchemaStore[modelName] = {
                schema: {},
                methods: {},
                staticMethods: {},
            };
        }
        SchemaStore[modelName].schema[name] = options;
    };
}

export function Method() {
    return (target: object, name: string, descriptor: PropertyDescriptor) => {
        const modelName = target.constructor.name;
        SchemaStore[modelName].methods[name] = descriptor.value;
    }
}
