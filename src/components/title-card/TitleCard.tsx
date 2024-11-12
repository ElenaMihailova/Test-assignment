import './styles.scss'
import Edit from '../../assets/icons/Edit.png'
import IconPrimary from '../IconPrimary'

export const TitleCard = () => {
  return (
    <h2 className='title title--h2'>Перспективные захоронения
    <IconPrimary src={Edit} alt={'Edit'}/></h2>
  )
}