import User, {IUser} from "../.././../models/user";
import Transaction from "../../../models/transactions";
import mongoose from "mongoose";


export const getUser = (id: any, callback: (err: Error, data?: { user: IUser, balance: number }) => void): void => {
    let sum: number = 0;
    let balanceError: Error = new Error("You don't have available balance in your bank account");
    let balance: number = 0;
    User.findById(id, {password: 0, email: 0}, (err: Error, user: IUser) => {
        if (err) {
            callback(err);
        } else {
            for (let i: number = 0; i < user.cart.items.length; i++) {
                sum += +user.cart.items[i].price * +user.cart.items[i].count;
            }
            if (user.balance < sum) {
                callback(balanceError);
            } else {
                balance = user.balance - sum;
                callback(null, {user, balance});
            }
        }
    });
};

export const transfer = async (userID: any, sum: number, callback: (err: Error, data?: any) => void) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const opts: {} = {session, new: true};
        User.findByIdAndUpdate({_id: userID}, {$set: {balance: sum}}, opts, async (err: Error, result: IUser) => {
            if (err) {
                callback(err);
                await session.abortTransaction();
                session.endSession();
            } else {
                await session.commitTransaction();
                callback(null, result);
            }
        });
    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        callback(err);
    }
};
export const createCheck = (user: IUser, callback: (err: Error, check?: {}) => void): void => {
    let items: {}[] = [];
    let totalPrice: number = 0;
    if (user.cart.items.length) {
        for (let i: number = 0; i < user.cart.items.length; i++) {
            let updateData: { count?: number, courseId?: string, price: number} = {price: 0};
            updateData.count = user.cart.items[i].count;
            updateData.courseId = user.cart.items[i].id;
            updateData.price += +user.cart.items[i].count * +user.cart.items[i].price;
            totalPrice += +user.cart.items[i].count * +user.cart.items[i].price;
            items.push(updateData);
        }
    }
    Transaction.create({userId: user._id, totalPrice, items}, (err: Error, check: {}) => {
        if (err) {
            callback(err);
        } else {
            callback(null, check);
        }
    });
};