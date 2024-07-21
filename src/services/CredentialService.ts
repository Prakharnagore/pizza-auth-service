import bcrypt from "bcryptjs";

export class CrendentialService {
    async comparePasword(userPasword: string, passwordHash: string) {
        return await bcrypt.compare(userPasword, passwordHash); // return true or false
    }
}
