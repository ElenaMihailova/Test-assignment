import Del from '../../assets/icons/RedDel.png';
import { Button } from '../button/Button';
import "./styles.scss"

interface Photo {
  filepath: string;
  thumbpath: string;
  name: string;
  date?: string;
}

interface PhotoSectionProps {
  photos: Photo[];
  onAddPhoto: (file: File) => void;
  onDeletePhoto: (imageName: string) => void; 
}

export const PhotoSection: React.FC<PhotoSectionProps> = ({ photos, onAddPhoto, onDeletePhoto }) => {
  const todayDate = new Date().toLocaleDateString();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onAddPhoto(file);
    }
  };


  return (
    <div className="card__section card__section--photo" >
      <h3>ПРИЛОЖЕННЫЕ ФОТО</h3>
      <div className="card__fields">
        <div className="photo">
          {photos.map((photo, index) => (
            <div className="photo__item" key={index}>
              <div className="photo__image">
                <img
                  src={photo.thumbpath}
                  alt={photo.name}
                  width={160}
                  height={160}
                />
                  <button
                    className="photo__delete-button"
                  onClick={() => onDeletePhoto(photo.name)}
                  >
                    <img src={Del} alt="Delete" width={20} height={20} />
                  </button>
              </div>
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
