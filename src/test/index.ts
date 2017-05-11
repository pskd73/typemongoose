import { expect } from "chai";
import { slow, suite, test, timeout } from "mocha-typescript";
import * as mongoose from "mongoose";
import BookRepo, { Book } from "./models/Book";
import UserRepo, { User } from "./models/User";

(mongoose as any).Promise = global.Promise;

@suite
class Tests {

    @test(slow(1000), timeout(5000))
    public connection(done) {
        mongoose.connect("mongodb://localhost/test", (error) => {
            const e = expect(error).to.be.not.ok;
            done();
        });
    }

    @test
    public async insert() {
        return UserRepo.create({ name: "Test" });
    }

    @test
    public async query() {
        return UserRepo.query.find({});
    }

    @test
    public async accessMethod() {
        const user = await UserRepo.query.findOne({});
        const name = user.getName();
        const e = expect(name).to.equal("Test");
    }

    @test
    public async testHooks() {
        const book = await BookRepo.create({ name: "Test book" });
        const e1 = expect(book.created_at).to.be.ok;
        const e2 = expect(book.updated_at).to.be.ok;
    }

}
