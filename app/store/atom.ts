import {create} from 'zustand'

type Message = {
    type:string,
    message:string,
}

type state = {
    messages:Message[],
    setmessages:(newmsg:Message)=>void
}

export const useStore = create<state>((set)=>({
    messages:[],
    setmessages:(newmsg)=> set((state)=>({messages:[...state.messages,newmsg]}))
}))

