import Building from "../../assets/icons/Building.png"
import './styles.scss'

export const Info = () => {
  return (
    <div className="info">
      <h2 className="info__title">ЧЕСТНЫЙ АГЕНТ</h2>
      <p className="info__role">МЕНЕДЖЕР ПРОЦЕССА</p>
      <div className="info__page">
        <img src={Building} alt="Building" className="icon" />
        <p>Организации</p>
      </div>
    </div>
  )
}