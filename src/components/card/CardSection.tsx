import React from 'react'
import IconPrimary from '../IconPrimary'
import Edit from '../../assets/icons/Edit.png'

interface Field {
  label: string;
  value: string;
}

interface CardSectionProps {
  title: string;
  fields: Field[];
}

export const CardSection: React.FC<CardSectionProps> = ({ title, fields }) => {
  return (
    <div className="card__section">
      <h3>{title}   <IconPrimary src={Edit} alt={'Edit'} /></h3>
      <div className="card__fields">
        {fields.map((field, index) => (
          <div className="field" key={index}>
            <p className="field__label">{field.label}</p>
            <p className="field__value">{field.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}