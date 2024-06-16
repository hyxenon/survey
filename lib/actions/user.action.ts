"use server"

import User from "../modals/user.modal"
import {connect} from '../db'

export async function createUser(user:any){
    try{
        await connect()
        const newUser = await User.create(user)
        return JSON.parse(JSON.stringify(newUser))
    } catch (error){
        console.log(error)
    }
}
export async function getUserByClerkId(clerkId: string){
    await connect();
  
    try {
      const user = await User.findOne({ clerkId });
      return user;
    } catch (error) {
      console.error('Error fetching user by clerkId:', error);
      return null;
    }
  }