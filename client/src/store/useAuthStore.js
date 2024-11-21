import {axiosInstance} from "../lib/axios"
import {create} from "zustand";
import toast, { Toaster } from "react-hot-toast"
import { disconnectSocket, initializeSocket } from "../socket/socket.client";

export const useAuthStore = create((set) => ({
    authUser : null,
    checkingAuth: true,
    loading: false,
    signup : async(signupData)=>{
        try {
            set({loading:true})
           const res =  await axiosInstance.post("/auth/signup",signupData);
           set({authUser: res.data.user});
           initializeSocket(res.data.user._id);
           toast.success("Account created successfully")
        } catch (error) {
            toast.error(error.response.data.message ||"Something went wrong");
        }finally{
            set({loading:false})
        }
    },
    
    logout: async()=>{
        try {
            const res =  await axiosInstance.post("/auth/logout");
            if(res.status===200) set({authUser:null});
            disconnectSocket();
            toast.success("Logout successfully")
        } catch (error) {
            toast.error(error.response.data.message || "Something went wrong")
        }
    },

    login : async(loginData) =>{
        try {
            set({loading:true});
            const res = await axiosInstance.post("/auth/login",loginData)
            set({authUser: res.data.user});
            initializeSocket(res.data.user._id)
            toast.success("Login successfully");
        } catch (error) {
            toast.error(error.response.data.message || "Something went wrong");
        }finally{
            set({loading:false})
        }
    },

    checkAuth: async() => {
        try {
          const res =  await axiosInstance.get("/auth/me");
            initializeSocket(res.data.user._id);
            set({authUser: res.data.user})
        } catch (error) {
            set({authUser:null})
        }finally{
            set({checkingAuth : false})
        }
    },

}))