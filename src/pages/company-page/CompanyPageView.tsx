
import { Card } from "../../components/card/Card"
import './styles.scss'
import { Navigation } from "../../components/navigation/Navigation"

export const CompanyPageView = () => {
  return (
    <>
      <Navigation />
      <div className="company">
        <Card />
      </div>
    </>

  )
}