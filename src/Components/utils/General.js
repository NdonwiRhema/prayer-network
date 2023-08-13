import { ref, uploadBytesResumable} from "firebase/storage";
import storage from "../../firebase";

export const extractGroup = (GroupData)=>{
     let newArray = []
   GroupData.length>0 && GroupData.forEach(element => {
    console.log(element)
    const resultant = element.group.split('-')
   newArray.push(resultant[1]) 
 });
 return newArray
}


export const uploadToFirebase=(file,name)=>{
    const fileRef = ref(storage,name)
    const metadata = {
      contentType:'audio/mpeg',
    }
    const uploadTask = uploadBytesResumable(fileRef,file,metadata)
    return uploadTask
  }
  

  export const randomString=()=>{
    const dte = new Date().getTime()
    return dte
  }