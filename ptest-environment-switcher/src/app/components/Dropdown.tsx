"use client";

import React, { useState } from 'react';
import styles from './Dropdown.module.css'; // Import the CSS module

interface DropdownProps {
    type: string;
    data: string[];
    onSelect: (item: string) => void;
  }

const Dropdown: React.FC<DropdownProps> = ({ type, data, onSelect }) => {
  
  const [isOpen, setIsOpen] = useState(false);
  
  const initialString = type === 'environment' 
  ? 'Select an environment' 
  : 'Select a key'
  const [selectedItem, setSelectedItem] = useState(initialString);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
    setIsOpen(false); // Close the dropdown after selecting
    onSelect(item);
  };

  return (
    <div className={`${styles.dropdown} ${isOpen ? styles.open : ''}`}> {/* Reference the CSS class with styles */}
      <button className={styles.dropdownToggle} onClick={toggleDropdown}>
        {selectedItem}
      </button>

      {isOpen && (
        <ul className={styles.dropdownMenu}>
            {data.map((item, index) => (
            <li key={index} onClick={() => handleItemClick(item)}>
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
