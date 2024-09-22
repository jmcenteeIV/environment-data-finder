"use client";

import React, { useState } from 'react';
import styles from './Dropdown.module.css'; // Import the CSS module

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState('Select an option');

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
    setIsOpen(false); // Close the dropdown after selecting
  };

  return (
    <div className={styles.dropdown}> {/* Reference the CSS class with styles */}
      <button className={styles.dropdownToggle} onClick={toggleDropdown}>
        {selectedItem}
      </button>

      {isOpen && (
        <ul className={styles.dropdownMenu}>
          <li onClick={() => handleItemClick('Option 1')}>Option 1</li>
          <li onClick={() => handleItemClick('Option 2')}>Option 2</li>
          <li onClick={() => handleItemClick('Option 3')}>Option 3</li>
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
