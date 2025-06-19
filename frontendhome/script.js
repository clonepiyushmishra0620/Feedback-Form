document.getElementById('submitbtn').addEventListener('click',(e)=>{
    var name = document.getElementsByName('nameInput')[0].value;
    var feedback = document.getElementsByName('feedbackInput')[0].value;

    document.getElementById('errorname').textContent = '';
    if (document.getElementById('errorname').classList.contains('show')) {
        document.getElementById('errorname').classList.remove('show');
    }

    document.getElementById('errorfeedback').textContent = '';
    if (document.getElementById('errorfeedback').classList.contains('show')) {
        document.getElementById('errorfeedback').classList.remove('show');
    }

    let valid = true;

    if (name == '') {
        document.getElementById('errorname').textContent = "*Name can't be empty! Please enter your name.";
        document.getElementById('errorname').classList.add('show');
        valid = false;
        e.preventDefault();
    } else {
        var authenticator = /^[A-Za-z \n]+$/.test(name);
        if (authenticator == false) {
            name = '';
            document.getElementById('errorname').textContent = "**Provide a valid name!";
            document.getElementById('errorname').classList.add('show');
            valid = false;
            e.preventDefault();
        }
    }

    if (feedback == '') {
        document.getElementById('errorfeedback').textContent = "*Enter something! Required**";
        document.getElementById('errorfeedback').classList.add('show');
        valid = false;
        e.preventDefault();
    } else {
        var authenticate = /^[^a-zA-Z]+$/.test(feedback);
        if (authenticate == true) {
            feedback = '';
            document.getElementById('errorfeedback').textContent = "**Enter a valid feedback!";
            document.getElementById('errorfeedback').classList.add('show');
            valid = false;
            e.preventDefault();
        }
    }

    if (valid) {
        e.preventDefault();

        fetch('/submit-feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: name, message: feedback })
        })
        .then(res => res.json())
        .then(data => {
            // ✅ Redirect to actual file name served by express.static
            window.location.href = "/responses.html";
        })
        .catch(err => {
            console.error('Error submitting feedback:', err);
        });
    }
});

