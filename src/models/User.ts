import mongoose from "mongoose";
import bcrypt from "bcrypt-nodejs";
import {NextFunction} from "express";

type UserDocument = mongoose.Document & {
    name: string;
    email: string;
    password: string;
};

type comparePasswordFunction = (candidatePassword: string, cb: (err: any, isMatch: any) => {}) => void;

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            unique: true,
        },
        name: String,
        password: {type: String, trim: true},
    },
    {
        versionKey: false,
        timestamps: {
            createdAt: true,
            updatedAt: true,
        },
    },
);

/**
 * Password hash middleware.
 */
userSchema.pre("save", function save(next: NextFunction) {
    const user = this as UserDocument;
    if (!user.isModified("password")) {
        return next();
    }
    bcrypt.genSalt(10, (err: Error, salt: string) => {
        if (err) {
            return next(err);
        }
        bcrypt.hash(user.password, salt, undefined, (err: mongoose.Error, hash: string) => {
            if (err) {
                return next(err);
            }
            user.password = hash;
            next();
        });
    });
});

const comparePassword: comparePasswordFunction = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err: mongoose.Error, isMatch: boolean) => {
        cb(err, isMatch);
    });
};

userSchema.methods.comparePassword = comparePassword;

export const User = mongoose.model<UserDocument>("User", userSchema);