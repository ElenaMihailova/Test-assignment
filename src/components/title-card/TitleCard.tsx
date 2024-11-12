import './styles.scss'
import Edit from '../../assets/icons/Edit.png'
import IconPrimary from '../IconPrimary'

export const TitleCard = () => {
  return (
    <h1 className='title title--h1'>Перспективные захоронения
    <IconPrimary src={Edit} alt={'Edit'}/></h1>
  )
}