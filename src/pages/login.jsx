import React, { useState } from 'react';
import './login.css'; // Optional: import a CSS file for styling

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // Basic validation
    if (username === '' || password === '') {
      setError('Please fill in all fields');
      return;
    }

    // Clear error
    setError('');

    // Placeholder for actual authentication logic
    console.log('Logging in with:', { username, password });

    // Reset form
    setUsername('');
    setPassword('');
  };

  return (
    <div className="login-container">
      <div>
        <h2>Login Hello</h2>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
