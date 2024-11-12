
import { Card } from "../../components/card/Card"
import './styles.scss'
import { Navigation } from "../../components/navigation/Navigation"

export const CompanyPageView = () => {
  return (
    <>
      <h1 className="visually-hidden">Страница организации</h1>
      <Navigation />
      <div className="company">
        <Card />
      </div>
    </>

  )
}