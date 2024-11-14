import React, { useEffect } from 'react';
import './styles.scss';

interface ModalProps {
  title: string;
  text: string;
  onCancel: () => void;
  onDelete: () => void;
  isOpen: boolean;
}

export const Modal: React.FC<ModalProps> = ({ title, text, onCancel, onDelete, isOpen }) => {

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal">
        <h2 className="modal__title">{title}</h2>
        <p className="modal__text">{text}</p>
        <div className="modal__actions">
          <button className="modal__button modal__button--cancel" onClick={onCancel}>
            Отмена
          </button>
          <button className="modal__button modal__button--delete" onClick={onDelete}>
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
};
