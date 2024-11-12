import { Info } from "../../components/info/Info"
import { Card } from "../../components/card/Card"
import './styles.scss'

export const CompanyPageView = () => {
  return (
    <div className="company">
      <Info />
      <Card/>
    </div>
  )
}