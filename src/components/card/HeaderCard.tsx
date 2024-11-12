import Linked from "../../assets/icons/Linked.png";
import Rotation from "../../assets/icons/Rotation.png";
import Delete from "../../assets/icons/Delete.png";
import IconPrimary from "../../components/IconPrimary";
import Arrow from "../../assets/icons/Arrow.png";

export const HeaderCard = () => {
  const buttons = [
    { src: Linked, alt: "Linked" },
    { src: Rotation, alt: "Rotation" },
    { src: Delete, alt: "Delete" },
  ];

  return (
    <header className="card__header">
      <a href="#" className="card__nav">
        <IconPrimary src={Arrow} alt="Arrow" /> К СПИСКУ ЮРИДИЧЕСКИХ ЛИЦ
      </a>
      <div>
        {buttons.map((button, index) => (
          <button key={index} className="card__nav-button">
            <IconPrimary src={button.src} alt={button.alt} />
          </button>
        ))}
      </div>
    </header>
  );
};
