import IconPrimary from '../IconPrimary';
import Edit from '../../assets/icons/Edit.png';
import { Button } from '../button/Button';

interface Photo {
  filepath: string;
  thumbpath: string;
  name: string;
  date?: string;
}

interface PhotoSectionProps {
  photos: Photo[];
}

export const PhotoSection: React.FC<PhotoSectionProps> = ({ photos }) => {
  const onClickButton = () => {
    console.log("Click");
  };

  return (
    <div className="card__section card__section--photo">
      <h3>ПРИЛОЖЕННЫЕ ФОТО <IconPrimary src={Edit} alt="Edit" /></h3>
      <div className="card__fields">
        <div className="photo">
          {photos.map((photo, index) => (
            <div className="photo__item" key={index}>
              <img
                src={photo.thumbpath}
                alt={photo.name}
                className="photo__image"
                width={160}
                height={160}
              />
              <p className="photo__title">{photo.name}</p>
              {photo.date && <p className="photo__date">{photo.date}</p>}
            </div>
          ))}
        </div>
        <Button text="Добавить изображение" onClick={onClickButton} />
      </div>
    </div>
  );
};
