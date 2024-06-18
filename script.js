// Execute when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Get references to DOM elements
    const savePasswordElement = document.getElementById("save-password");
    const generatePasswordElement = document.getElementById("generate-password");
    const navLinks = document.querySelectorAll(".nav-link");

    // Initially hide the save and generate password elements
    savePasswordElement.classList.add("d-none");
    generatePasswordElement.classList.add("d-none");

    // Add click event listeners to all navigation links
    navLinks.forEach(element => {
        element.addEventListener("click", (evt) => {
            // Remove 'active' class from all navigation links
            navLinks.forEach(link => link.classList.remove("active"));

            // Add 'active' class to the clicked navigation link
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

    // Function to generate a random password with specified length
    function generatePassword(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?';
        let result = '';
        const charactersLength = characters.length;
        for (let index = 0; index < length; index++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    // Get references to password generation form elements
    const textPassword = document.getElementById("textPassword");
    const myPassword = document.getElementById("my-password");
    const errorMessage = document.getElementById("error");
    const generatePasswordButton = document.getElementById("generatePasswordButton");
    const copyText = document.getElementById("copy-text");

    // Initially hide the copy button
    copyText.classList.add("d-none");

    // Add event listener to the Generate Password button
    generatePasswordButton.addEventListener("click", () => {
        // Get the value of the password length input and parse it as an integer
        const myPasswordValue = parseInt(myPassword.value, 10);

        // Validate the input: check if it's a valid number greater than 0
        if (isNaN(myPasswordValue) || myPasswordValue < 1) {
            errorMessage.textContent = "Please enter a valid number greater than 0";
            textPassword.innerText = "";
            copyText.classList.add("d-none");
        } else if (myPasswordValue > 36) {
            errorMessage.textContent = "It is not possible to create a password with more than 36 characters";
            textPassword.innerText = "";
            copyText.classList.add("d-none");
        } else {
            // Clear any previous error messages
            errorMessage.textContent = "";

            // Generate a password of the specified length
            const password = generatePassword(myPasswordValue);

            // Display the generated password
            textPassword.innerText = password;

            // Make the copy button visible
            copyText.classList.remove("d-none");

            // Add event listener to the Copy button to copy the generated password to the clipboard
            copyText.addEventListener("click", () => {
                navigator.clipboard.writeText(password).then(() => {
                    alert(`Password copied to clipboard : ${password}`);
                }).catch(err => {
                    console.error('Failed to copy text: ', err);
                });
            });
        }
    });


    // Selecting elements from the DOM
    const prefixName = document.getElementById("prefix-name");
    const password = document.getElementById("password");
    const savePasswordButton = document.getElementById("savePasswordButton");

    // Adding click event listener to the save password button
    let myPasswords = localStorage.getItem("passwords") ? JSON.parse(localStorage.getItem("passwords")) : [];

    savePasswordButton.addEventListener("click", (evt) => {
        evt.preventDefault();

        let prefixNameValue = prefixName.value;
        let passwordValue = password.value;

        // Create a new object with prefixNameValue and passwordValue
        let newPassword = {
            prefixNameValue: prefixNameValue,
            passwordValue: passwordValue
        };

        // Add the new password object to the existing array
        myPasswords.push(newPassword);

        // Store the updated array in localStorage
        localStorage.setItem("passwords", JSON.stringify(myPasswords));

        // Optionally, clear the input fields
        prefixName.value = "";
        password.value = "";

        // Optionally, provide feedback to the user
        alert("Password saved successfully!");
    });

});
