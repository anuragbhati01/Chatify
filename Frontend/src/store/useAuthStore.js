import {create } from "zustand";

export const useAuthStore = create((set) => ({
    authUser : {name : "Sanju", _id: 123, age: 25},
    isLoading : false,
}));