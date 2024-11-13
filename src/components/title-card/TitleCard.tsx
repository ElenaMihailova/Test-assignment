import './styles.scss'
import Edit from '../../assets/icons/Edit.png'
import IconPrimary from '../IconPrimary'

interface TitleCardProps {
  name: string;
}

export const TitleCard: React.FC<TitleCardProps> = ({ name }) => {
  return (
    <h2 className='title title--h2'>{name}
      <IconPrimary src={Edit} alt={'Edit'} /></h2>
  )
}