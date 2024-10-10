document.getElementById('studentForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const age = parseInt(document.getElementById('age').value);
    const course = document.getElementById('course').value.trim();
    const techSkills = document.getElementById('techSkills').value;
    const whyHire = document.getElementById('whyHire').value.trim();

    // Simple validation
    if (!name || !email || !age || !course || !techSkills || !whyHire) {
        document.getElementById('message').innerText = 'Please fill in all fields.';
        document.getElementById('message').style.color = 'red';
        return;
    }

    const student = { name, email, age, course, techSkills, whyHire };

    try {
        const response = await fetch('/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(student),
        });

        if (response.ok) {
            document.getElementById('message').innerText = 'Student information submitted successfully!';
            document.getElementById('message').style.color = 'green';
            document.getElementById('studentForm').reset();
        } else {
            const errorText = await response.text();
            document.getElementById('message').innerText = `Error: ${errorText}`;
            document.getElementById('message').style.color = 'red';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('message').innerText = 'An unexpected error occurred.';
        document.getElementById('message').style.color = 'red';
    }
});
