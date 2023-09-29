import bcrypt from "bcrypt";
const saltRounds = 3; //rounds=8 : ~40 hashes/sec. 
export function passwordEncryption(password: string) {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashPassword = bcrypt.hashSync(password, salt);
    return hashPassword;
}

export function verifyPassword(password: string, hashPassword: string) {
    return bcrypt.compareSync(password, hashPassword);
}
