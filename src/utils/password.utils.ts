import { hashSync, compareSync, genSaltSync } from "bcrypt";

export const generateRandomPassword = (length: number): string => {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+{}[]|:;<>,.?/~`";
    let password = "";
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
  
    return password;
  }

export const hashPassword = async(password:string): Promise<string> => {
    const SALT = genSaltSync();
    return hashSync(password, SALT);
}

export const comparePassword = async(plainPassword:string, hashedPassword: string): Promise<boolean> => {
    const result = compareSync(plainPassword, hashedPassword);
    return result;
}