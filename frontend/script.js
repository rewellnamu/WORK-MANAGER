const apiUrl = 'http://localhost:5000/api/users';
    const userTable = document.getElementById('userTable');
    const userForm = document.getElementById('userForm');
    const errorDiv = document.getElementById('error');

    function fetchUsers() {
      fetch(apiUrl)
        .then(res => {
          if (!res.ok) throw new Error('Failed to fetch users');
          return res.json();
        })
        .then(users => {
          userTable.innerHTML = '';
          users.forEach(user => {
            const row = document.createElement('tr');
            // Add contact column
            row.innerHTML = `<td>${user.name}</td><td>${user.email}</td><td>${user.contact || ''}</td>`;
            userTable.appendChild(row);
          });
        })
        .catch(err => {
          errorDiv.textContent = err.message;
        });
    }

    userForm.addEventListener('submit', function(e) {
      e.preventDefault();
      errorDiv.textContent = '';
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const contact = document.getElementById('contact').value.trim();
      fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, contact })
      })
      .then(res => {
        if (!res.ok) throw new Error('Failed to add user');
        return res.json();
      })
      .then(() => {
        userForm.reset();
        fetchUsers();
      })
      .catch(err => {
        errorDiv.textContent = err.message;
      });
    });

    fetchUsers();