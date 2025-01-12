

export async function ask_elon(query:string){
    let response = fetch("/api/agent", {
        method:"POST", 
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify({
            question:query
        })
    })
    let data:{response:string} = await response.then(res=>res.json())
    return data
}