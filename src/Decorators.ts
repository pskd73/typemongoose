import { Document, model, Schema } from "mongoose";

const SchemaStore = {};

export function Model<T extends Document>() {
    return (constructor: any) => {
        const modelName = (constructor as () => void).name;
        const schema = new Schema(SchemaStore[modelName].schema);
        for (const method in SchemaStore[modelName].methods) {
            if (method) {
                schema.methods[method] = SchemaStore[modelName].methods[method];
            }
        }
        for (const method in SchemaStore[modelName].staticMethods) {
            if (method) {
                schema.statics[method] = SchemaStore[modelName].staticMethods[method];
            }
        }
        model<T>(modelName, schema);
    };
}

export function Member(options: object) {
    return (target: object, name: string) => {
        const modelName = (target as object).constructor.name;
        if (!SchemaStore[modelName]) {
            SchemaStore[modelName] = {
                methods: {},
                schema: {},
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
    };
}
