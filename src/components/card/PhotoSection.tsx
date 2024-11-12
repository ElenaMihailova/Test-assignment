import IconPrimary from '../IconPrimary'
import Edit from '../../assets/icons/Edit.png'
import { Button } from '../button/Button'

import exampleImage from '../../assets/example.png';

const photos = [
  {
    src: exampleImage,
    title: 'Надгробный камень.jpg',
    date: '11 июня 2018',
  },
  {
    src: exampleImage,
    title: 'Фото 2',
    date: '15.04.2023',
  },
  {
    src: exampleImage,
    title: 'Фото 3',
    date: '15.04.2023',
  },

];


export const PhotoSection = () => {
  const onClickButton = () => {
    console.log("Click")
  }
  return (
    <div className="card__section card__section--photo">
      <h3> ПРИЛОЖЕННЫЕ ФОТО <IconPrimary src={Edit} alt={'Edit'} /></h3>
      <div className="card__fields">
        <div className="photo">
          {photos.map((photo, index) => (
            <div className="photo__item" key={index}>
              <img src={photo.src} alt={photo.title} className="photo__image" width={160} height={160} />
              <p className="photo__title">{photo.title}</p>
              <p className="photo__date">{photo.date}</p>
            </div>
          ))}
        </div>
        <Button text={'Добавить изображение'} onClick={onClickButton} />


      </div>
    </div>

  )
}