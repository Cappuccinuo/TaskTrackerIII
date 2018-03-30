import React from 'react';

export default function Newtask(params) {
  return (
    <form className="form-style-7">
      <ul>
        <li>
            <label>Name</label>
            <input type="text" name="name" maxLength="100"/>
            <span>Enter your full name here</span>
        </li>
        <li>
            <label>Email</label>
            <input type="email" name="email" maxLength="100"/>
            <span>Enter a valid email address</span>
        </li>
        <li>
            <label>Website</label>
            <input type="url" name="url" maxLength="100"/>
            <span>Your website address (eg: http://www.google.com)</span>
        </li>
        <li>
            <label>About You</label>
            <textarea name="bio"></textarea>
            <span>Say something about yourself</span>
        </li>
        <li>
            <input type="submit" value="Send This" />
        </li>
      </ul>
    </form>
  );
}
