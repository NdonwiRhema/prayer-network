export const toBase64Encoded=(file)=>{
    let reader = new FileReader()
    reader.readAsDataURL(file)
    return new Promise(resolve =>{
        reader.onloadend = ()=>{
            resolve(reader.result)
         }
    })
    
}