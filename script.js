document.addEventListener("DOMContentLoaded", () => {
    const savePasswordElement = document.getElementById("save-password");
    const generatePasswordElement = document.getElementById("generate-password");
    const navLinks = document.querySelectorAll(".nav-link");
    
    // Initially hide the elements
    savePasswordElement.classList.add("d-none");
    generatePasswordElement.classList.add("d-none");

    navLinks.forEach(element => {
        element.addEventListener("click", (evt) => {
            // Remove 'active' class from all nav links
            navLinks.forEach(link => link.classList.remove("active"));

            // Add 'active' class to the clicked nav link
            element.classList.add("active");

            // Check the text content of the clicked link and show/hide the corresponding elements
            if (evt.target.textContent.trim() === "Save Password") {
                savePasswordElement.classList.remove("d-none");
                generatePasswordElement.classList.add("d-none");
            } else if (evt.target.textContent.trim() === "Generate Password") {
                savePasswordElement.classList.add("d-none");
                generatePasswordElement.classList.remove("d-none");
            }
        });
    });

    function generatePassword(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?';
        let result = '';
        const charactersLength = characters.length;
        for (let index = 0; index < length; index++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    const textPassword = document.getElementById("textPassword");
    const myPassword = document.getElementById("my-password");
    const errorMessage = document.getElementById("error");
    const generatePasswordButton = document.getElementById("generatePasswordButton");
    const copyText = document.getElementById("copy-text");

    copyText.classList.add("d-none");

    generatePasswordButton.addEventListener("click", () => {
        const myPasswordValue = parseInt(myPassword.value, 10);
        if (isNaN(myPasswordValue) || myPasswordValue < 1) {
            errorMessage.textContent = "Please enter a valid number greater than 0";
            textPassword.innerText = "";
            copyText.classList.add("d-none");
        } else if (myPasswordValue > 36) {
            errorMessage.textContent = "It is not possible to create a password with more than 36 characters";
            textPassword.innerText = "";
            copyText.classList.add("d-none");
        } else {
            errorMessage.textContent = "";
            const password = generatePassword(myPasswordValue);
            textPassword.innerText = password;
            copyText.classList.remove("d-none");

            copyText.addEventListener("click", () => {
                navigator.clipboard.writeText(password).then(() => {
                    alert(`Password copied to clipboard : ${password}`);
                }).catch(err => {
                    console.error('Failed to copy text: ', err);
                });
            });
        }
    });
});
