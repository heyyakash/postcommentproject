const form = document.getElementById("login-form")
form.addEventListener("submit", async (e) => {
    e.preventDefault()
    formdata = new FormData(form)
    const payload = {
        name: formdata.get("name"),
        email: formdata.get("email"),
        password: formdata.get("password")
    }
    const res = await fetch("/auth/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
    })
    const result = await res.json()
    if (res.status === 200) {
        window.location.href = "/"
    } else {
        alert(result.message)
    }
})