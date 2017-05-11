# typemongoose
Typescript wrapper for mongoose library

## Installation
```
npm install --save typemongoose
```

It makes use of decorators. Check the example below
```
import * as mongoose from "mongoose";
import { BaseModel, Decorators, ModelRepo } from "typemongoose";
const {
    Hook,
    Hooks,
    HookTypes,
    Member,
    Method,
    Model
} = Decorators;

@Model<User>()
export abstract class User extends BaseModel {

    @Member({ type: String })
    public name: string;

    @Member({ type: Date })
    public dob: Date;

    @Member({ type: Boolean })
    public isMale: boolean;

    @Member({ type: Date })
    public created_at: Date;

    @Member({ type: Date })
    public updated_at: Date;

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

    @Hook(HookTypes.pre, Hooks.save)
    private async beforeSave() {
        if (!this.created_at) {
            this.created_at = new Date();
        }
        this.updated_at = new Date();
    }

}

class RUser extends ModelRepo<User> {

    protected getModelName() {
        return "User";
    }

    public async getAllObjects(): Promise<User[]> {
        return this.query.find({});
    }

}

const UserRepo = new RUser();
```
## Note
- The object (```User```) should be abstract. The reason is, mongoose itself creates a object, extending the class we provide
- To create new object you can do as explained below
```
const user = UserRepo.create({...}); // save will get automatically
```
or
```
const user = new UserRepo.query({...});
user.save();
```
- You can define hooks as explained above. Hooke type can be `HookTypes.pre` or `HookTypes.post` and hooks can be `Hooks.init`, `Hooks.remove`, `Hooks.save`, `Hooks.update` and `Hooks.validate`
- If you do not want to have new repo for the model, you can use ```BasicRepo``` as explained below
```
import { BasicRepo } from "typemongoose";
class Book extends ... {...};
const BookRepo = new BasicRepo(Book);
```

Here you have two type of objects
1. ```User```
  It is the base object you will get when query. You can define methods to it assigning decorator.
2. ```UserRepo```
  It is the Repository for the ```User``` object. You can define static methods here. You can query everything we use on mongoose object from ```UserRepo.query```. Check following example

```
const all = await UserRepo.query.find({});
const user = await UserRepo.query.findOne({...});
```
When you have reference members, you can define them as below
```
@Model<Book>()
export abstract class Book extends BaseModel {

    @Member({ type: String })
    public name: string;

    @Member({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
    public user: string|User;

}

class RBook extends ModelRepo<Book> {

    protected getModelName() {
        return "Book";
    }

}

const BookRepo = new RBook();
```
And you can use it as
```
const book = BookRepo.findOne({}).populate("user");
const user: User = book.user;
user.getName();
```
Or
```
const book = BookRepo.findOne({});
const user: String = book.user.toString(); // it will be id now
```
