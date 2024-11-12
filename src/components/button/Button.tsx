import React from 'react'
import "./styles.scss"

interface ButtonProps {
  text: string;
  onClick: () => void;
}

export const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <button className='button' type='button' onClick={onClick}>
      <span className='button__icon'>+</span> <span>{text}</span></button>
  )
}