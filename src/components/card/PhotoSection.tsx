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
  onAddPhoto: (file: File) => void;
}

export const PhotoSection: React.FC<PhotoSectionProps> = ({ photos, onAddPhoto }) => {
  const todayDate = new Date().toLocaleDateString();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onAddPhoto(file);
    }
  };

  return (
    <div className="card__section card__section--photo">
      <h3>ПРИЛОЖЕННЫЕ ФОТО
        <button className="button button--edit">
          <IconPrimary src={Edit} alt="Edit" />
        </button></h3>
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
              <p className="photo__date">{photo.date || todayDate}</p>
            </div>
          ))}
        </div>
        <input
          type="file"
          id="upload-photo"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <Button
          text="Добавить изображение"
          onClick={() => document.getElementById('upload-photo')?.click()}
        />
      </div>
    </div>
  );
};
