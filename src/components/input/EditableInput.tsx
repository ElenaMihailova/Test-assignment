import React, { useState } from 'react';
import './styles.scss';

interface EditableInputProps {
  value: string;
  onChange: (newValue: string) => void;
  onSave: () => void;
  onBlur?: () => void;
}

export const EditableInput: React.FC<EditableInputProps> = ({
  value,
  onChange,
  onSave,
  onBlur,
}) => {
  const [inputValue, setInputValue] = useState(value);

  const handleBlur = () => {
    if (onBlur) onBlur();
  };

  return (
    <input
      type="text"
      className="editable-input"
      value={inputValue}
      onChange={(e) => {
        setInputValue(e.target.value);
        onChange(e.target.value);
      }}
      onBlur={handleBlur}
      onKeyDown={(e) => e.key === 'Enter' && onSave()}
      autoFocus
    />
  );
};
