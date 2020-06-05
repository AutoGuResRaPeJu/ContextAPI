interface Response{
token:string,
user:{
    name:string;
    email:string;
}
};
export function signIn():Promise<Response>{
    return new Promise(resolve=>{
setTimeout(()=>{
resolve({
   token:'jisjkfjskmklm2e23kdsn222491119',
   user:{
       name:'Rafael',
       email:'rpererah@gmail.com'
   },
})
},2000);
    });
}