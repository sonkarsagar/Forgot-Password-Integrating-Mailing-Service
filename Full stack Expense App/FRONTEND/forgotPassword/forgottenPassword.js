const email=document.getElementById('femail')
const cancel=document.getElementById('cancel')
const search=document.getElementById('search')

cancel.addEventListener('click',(e)=>{
    
    location.replace('http://127.0.0.1:5500/logIn/login.html')
})

search.addEventListener('click',(e)=>{
    e.preventDefault()
    axios.post('http://127.0.0.1:3000/password/forgotpassword',{
        email: email.value
    }).then((result) => {
        
    }).catch((err) => {
        console.log(err);
    });
})

window.addEventListener('DOMContentLoaded',(e)=>{
    
})