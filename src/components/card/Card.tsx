import { HeaderCard } from "./HeaderCard"
import { TitleCard } from '../title-card/TitleCard'
import './styles.scss'
import { CardSection } from "./CardSection"
import { PhotoSection } from './PhotoSection'

export const Card = () => {

  const sections = [
    {
      title: 'ОБЩАЯ ИНФОРМАЦИЯ',
      fields: [
        { label: 'Полное название:', value: 'ООО Фирма “Перспективные захоронения”' },
        { label: 'Договор:', value: '12345 от 12.03.2015' },
        { label: 'Форма:', value: 'OOO' },
        { label: 'Тип:', value: 'Агент, Подрядчик' },
      ],
    },
    {
      title: 'КОНТАКТНЫЕ ДАННЫЕ',
      fields: [
        { label: 'ФИО:', value: 'Григорьев Сергей Петрович' },
        { label: 'Телефон:', value: '+7 (916) 216-55-88' },
        { label: 'Эл. почта:', value: 'grigoriev@funeral.com' },
      ],
    }

  ]
  return (
    <div className="card">
      <HeaderCard />
      <div className="card__content">
        <TitleCard />
        {sections.map((section, index) => (
          <CardSection key={index} title={section.title} fields={section.fields} />
        ))}
        <PhotoSection />
      </div>

      {/* <TitleCard/>
      <GeneralInfoCard/>
      <ContactsCard/>
      <PhotoCard/> */}

    </div>
  )
}