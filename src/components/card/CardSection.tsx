import React, { useState } from 'react';
import IconPrimary from '../IconPrimary';
import Edit from '../../assets/icons/Edit.png';
import { EditableInput } from '../input/EditableInput';

interface Field {
  label: string;
  value: string;
  editable?: boolean;
  className?: string;
}

interface CardSectionProps {
  title: string;
  fields: Field[];
  onFieldChange: (label: string, newValue: string) => void;
  onSave: () => void;
  onSaveContact?: () => void;
}

export const CardSection: React.FC<CardSectionProps> = ({
  title,
  fields,
  onFieldChange,
  onSave,
  onSaveContact,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleFieldChange = (label: string, newValue: string) => {
    onFieldChange(label, newValue);
  };

  const handleSave = () => {
    setIsEditing(false);
    onSave();
    if (title === 'КОНТАКТНЫЕ ДАННЫЕ' && onSaveContact) {
      onSaveContact();
    }
  };

  return (
    <div className="card__section">
      <h3>
        {title}
        <button className="button button--edit" onClick={handleEditClick}>
          <IconPrimary src={Edit} alt="Edit" />
        </button>
      </h3>
      <div className="card__fields">
        {fields.map((field, index) => (
          <div key={index} className={`field ${field.className || ''}`}>
            <p className="field__label">{field.label}</p>
            {isEditing && field.editable ? (
              <EditableInput
                value={field.value}
                onChange={(newValue) => handleFieldChange(field.label, newValue)}
                onSave={handleSave}
              />
            ) : (
              <p className="field__value">{field.value}</p>
            )}
          </div>
        ))}
      </div>
      {isEditing && (
        <button onClick={handleSave} className="button button--save">
          Сохранить
        </button>
      )}
    </div>
  );
};
