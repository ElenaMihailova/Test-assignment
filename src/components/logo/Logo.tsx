import logoSrc from "../../assets/Logo.png";
import './styles.scss'

export const Logo = () => {
  return (
    <div className="logo">
      <img src={logoSrc} alt="Логотип" />
    </div>
  )
}