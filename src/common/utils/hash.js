import argon2 from "argon2";

export const hashPassword = (plain) => argon2.hash(plain);
export const verifyPassword = (hash, plain) => argon2.verify(hash, plain);
