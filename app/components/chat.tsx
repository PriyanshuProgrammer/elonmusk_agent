import { useEffect, useRef, useState } from "react"
import { ask_elon } from "../utils/functions"
import { useRecoilValue } from "recoil"
import { useStore } from "../store/atom"
import {Scrollbar} from 'react-scrollbars-custom'

export default function Chat(){
    // hooks
    const [height, setheight] = useState<number>(50)
    const query = useRef<HTMLInputElement>(null)
    const {messages,setmessages} = useStore()

    //functions
    async function submitevent(){
        setheight(5)
        const value = query.current?.value
        if(query.current)
            query.current.value = ''
        if(value?.trim()){
            setmessages({type:"user", message:value})
            const response = await ask_elon(value)
            setmessages({type:"ai", message:response.response})
        }    
    }

   

    return (
        <>
        <Scrollbar  style={{width:"50vw"}} className="grow flex flex-col ">
                {
                    messages.map((el,index)=>{
                        if(el.type == 'ai'){
                            return <div key={index} className="ml-auto w-[50%]">
                                {el.message}
                            </div>
                        }else{
                            return <div key={index} className="mr-auto w-[50%]">
                                {el.message}
                            </div>
                        }
                    })
                }
            </Scrollbar>
            <div style={{marginBottom:`${height}vh`}} className="flex gap-1 mt-5">
                <input type="text" ref={query} className="p-2 w-[40vw] text-black outline-none rounded-md" placeholder="Ask Elon anything...." />
                <button onClick={submitevent} className="bg-violet-950 text-white p-2 rounded-md">Ask</button>
            </div>
    </>
    )
}