export const extractGroup = (GroupData)=>{
     let newArray = []
   GroupData.length>0 && GroupData.forEach(element => {
    console.log(element)
    const resultant = element.group.split('-')
   newArray.push(resultant[1]) 
 });
 return newArray
}
