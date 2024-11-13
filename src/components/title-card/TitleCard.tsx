import { useState } from 'react';
import './styles.scss';
import Edit from '../../assets/icons/Edit.png';
import IconPrimary from '../IconPrimary';
import { EditableInput } from '../input/EditableInput';

interface TitleCardProps {
  name: string;
  onNameChange: (newName: string) => void;
}

export const TitleCard: React.FC<TitleCardProps> = ({ name, onNameChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentName, setCurrentName] = useState(name);

  const handleEditClick = () => setIsEditing(true);
  const handleSave = () => {
    setIsEditing(false);
    onNameChange(currentName);
  };

  return (
    <div className='title'>
      {isEditing ? (
        <EditableInput
          value={currentName}
          onChange={(newValue) => setCurrentName(newValue)}
          onSave={handleSave}
        />
      ) : (
        <h2 className="title__text">
          {currentName}
          <button className="button button--edit" onClick={handleEditClick}>
            <IconPrimary src={Edit} alt="Edit" />
          </button>
        </h2>
      )}
    </div>
  );
};
