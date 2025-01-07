

export async function ask_elon(query:string){
    let response = fetch("http://127.0.0.1:5000", {
        method:"POST", 
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify({
            question:query
        })
    })
    let data:{reponse:string} = await response.then(res=>res.json())
    return data
}