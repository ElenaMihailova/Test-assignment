interface IconPrimaryProps {
  src: string;
  alt: string;
}
const Icon: React.FC<IconPrimaryProps> = ({ src, alt }) => {
  return (
    <img src={src} alt={alt} className="icon icon--middle" />
  );
};

export default Icon;


