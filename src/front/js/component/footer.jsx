import React from 'react';

export const Footer = () => {
  return (
    <footer className="bg-dark text-center text-white mt-4 py-3">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} Star Wars. All rights reserved.</p>
      </div>
    </footer>
  );
};
