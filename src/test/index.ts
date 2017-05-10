import { expect } from "chai";
import { slow, suite, test, timeout } from "mocha-typescript";
import BookRepo, { Book } from "./models/Book";
import UserRepo, { User } from "./models/User";

@suite
class Tests {
    @test
    public connection() {
        const expected = expect(false).to.be.ok;
    }
}
