const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const button = document.querySelector('.submit-btn');
const errorText = document.querySelector('.error');

button.addEventListener('click', async () => {
    const email = emailInput.value;
    const password = passwordInput.value;

    if(!email || !password) {
        errorText.textContent = "please fill all the fields";
        errorText.style.display = "block";
        return;
    }

    try {
        loader.style.display = 'block';

        const response = await fetch('/api/auth/login', 
            {
                method: 'POST',
                headers: {
                    'content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password }),
                credentials: 'include'
        });

        const data = await response.json();
        loader.style.display = 'none';

        if(response.ok) {
            window.location.href = "tasks.html";
        } else {
            errorText.textContent = data.error || "Server Error";
            errorText.style.display = 'block';
        }
    } catch (error) {
        console.error("Network error", error)
        errorText.textContent = "Server issue, please try again";
        errorText.style.display = "block";
    }
});





