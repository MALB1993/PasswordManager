document.addEventListener("DOMContentLoaded", () => {
    const savePasswordElement = document.getElementById("save-password");
    const generatePasswordElement = document.getElementById("generate-password");
    const navLinks = document.querySelectorAll(".nav-link");

    savePasswordElement.classList.add("d-none");
    generatePasswordElement.classList.add("d-none");

    navLinks.forEach(element => {
        element.addEventListener("click", (evt) => {
            navLinks.forEach(link => link.classList.remove("active"));
            element.classList.add("active");

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

    const prefixName = document.getElementById("prefix-name");
    const password = document.getElementById("password");
    const savePasswordButton = document.getElementById("savePasswordButton");

    let myPasswords = localStorage.getItem("passwords") ? JSON.parse(localStorage.getItem("passwords")) : [];

    savePasswordButton.addEventListener("click", (evt) => {
        evt.preventDefault();

        let prefixNameValue = prefixName.value;
        let passwordValue = password.value;

        let newPassword = {
            prefixNameValue: prefixNameValue,
            passwordValue: passwordValue
        };

        myPasswords.push(newPassword);
        localStorage.setItem("passwords", JSON.stringify(myPasswords));

        // Clear the input fields
        prefixName.value = "";
        password.value = "";

        // Update the table with the new data
        renderPasswordTable();
        
        // Optionally, provide feedback to the user
        alert("Password saved successfully!");
    });

    function renderPasswordTable() {
        let getPasswords = localStorage.getItem("passwords");
        let passwordToArray = JSON.parse(getPasswords);

        let content = "";

        passwordToArray.forEach(password => {
            content += `
                <tr>
                    <td>${password.prefixNameValue}</td>
                    <td>${password.passwordValue}</td>
                </tr>
            `;
        });

        const tablePassword = document.getElementById("tablePassword");
        tablePassword.innerHTML = content;
    }

    // Initial render of the password table
    renderPasswordTable();
});
