const form = document.getElementById("login-form")

// Form to send login email and password to the backend
form.addEventListener("submit",async (e)=>{
    e.preventDefault()
    formdata = new FormData(form)
    const payload = {
        email: formdata.get("email"),
        password: formdata.get("password")
    }
    const res = await fetch("/auth/login",{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify(payload)
    })
    const result = await res.json()
    if (result.status){
        window.location.href  = "/"
    }else{
        alert(result.message)
    }
})
