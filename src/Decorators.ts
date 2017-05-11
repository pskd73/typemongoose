import { Document, model, Schema } from "mongoose";

const SchemaStore = {};
export enum HookTypes {
    post,
    pre,
}
export enum Hooks {
    init,
    remove,
    save,
    update,
    validate,
}

export function Model<T extends Document>() {
    return (constructor: any) => {
        const modelName = (constructor as () => void).name;
        const schema = new Schema(SchemaStore[modelName].schema);
        // assign methods
        for (const method in SchemaStore[modelName].methods) {
            if (method) {
                schema.methods[method] = SchemaStore[modelName].methods[method];
            }
        }
        // assign static methods
        for (const method in SchemaStore[modelName].staticMethods) {
            if (method) {
                schema.statics[method] = SchemaStore[modelName].staticMethods[method];
            }
        }
        // assign pre hooks
        const preIndex = HookTypes[HookTypes.pre];
        for (const hook in SchemaStore[modelName].hooks[preIndex]) {
            if (hook) {
                schema.pre(hook, function(next) {
                    SchemaStore[modelName].hooks[preIndex][hook].call(this)
                        .then(() => next())
                        .catch(next);
                });
            }
        }
        // assign post hooks
        const postIndex = HookTypes[HookTypes.post];
        for (const hook in SchemaStore[modelName].hooks[postIndex]) {
            if (hook) {
                schema.post(hook, function() {
                    SchemaStore[modelName].hooks[postIndex][hook].call(this);
                });
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
                hooks: { pre: {}, post: {} },
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

export function Hook(type: HookTypes, hook: Hooks) {
    return (target: object, name: string, descriptor: PropertyDescriptor) => {
        const modelName = target.constructor.name;
        const hookType = HookTypes[type];
        const hookName = Hooks[hook];
        SchemaStore[modelName].hooks[hookType][hookName] = descriptor.value;
    };
}
