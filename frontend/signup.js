const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const confirmPasswordInput = document.querySelector('#confirmPassword');
const button = document.querySelector('.submit-btn');
const errorText = document.querySelector('.error');


button.addEventListener('click', async () => {
    const email = emailInput.value;
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if(!email || !password || !confirmPassword) {
        errorText.textContent = "Please fill all the fields";
        errorText.style.display = "block";
        return;
    }
    if(password !== confirmPassword) {
        errorText.textContent = "Passwords didn't match";
        errorText.style.display = "block";
        return;
    }

    try {
        loader.style.display = 'flex';
        const response = await fetch('/api/auth/signup', 
            {
                method: 'POST',
                headers: {
                    'content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password, confirmPassword }),
                credentials: 'include'
        });

        const data = await response.json();
        loader.style.display = 'none';

        if(response.ok) {
            window.location.href = "tasks.html";
        } else {
            errorText.textContent = data.response || "Login failed";
            errorText.style.display = 'block';
        }
    } catch (error) {
        console.error("Network error", error)
        errorText.textContent = "Server issue, please try again";
        errorText.style.display = "block";
    }
});





