import {create} from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { getSocket } from "../socket/socket.client";
import { useAuthStore } from "./useAuthStore";

export const useMessageStore = create((set)=>  ({
    messages: [],
    loading : false,
    
    sendMessage:async (receiverId, content) =>{
        try {
            set(state=> ({
                messages: [...state.messages , {sender: useAuthStore.getState().authUser._id , content}],
            }));
            const res =  await axiosInstance.post("/messages/send", {receiverId, content});
            console.log("message sent:", res.data)
        } catch (error) {
            toast.error(error.response.data.message || "Something went wrong")
        }
    }, 
    getMessage:async (userId) =>{
        try {
            set({loading:true});
            const res = await axiosInstance.get(`/messages/conversation/${userId}`)
            set({messages: res.data.messages})
        } catch (error) {
            console.log(error);
            set({messages: []})   
        }finally{
            set({loading:false})
        }
    },

    subscribeToMessages : () =>{
        const socket  = getSocket();
        socket.on("newMessage", ({message}) =>{
            set(state=> ({messages : [...state.messages , message]}))
        })
    },
    unsubscribeToMessages  :() =>{
        const socket = getSocket();
        socket.off("newMessage");
    },
}));