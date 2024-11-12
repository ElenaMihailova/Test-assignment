import './styles.scss';
import Home from '../../assets/icons/Home.png';
import Market from '../../assets/icons/Market.png';
import Search from '../../assets/icons/Search.png';
import Setting from '../../assets/icons/Settings.png';
import Chat from '../../assets/icons/Chat.png';
import Exit from '../../assets/icons/Exit.png';
import { Info } from '../info/Info';

export const Navigation = () => {
  return (
    <div className="navigation">
      <div className='navigation__wrap'>
        <nav className="menu">
          <ul>
            <li><a href="#"><img src={Home} alt="Home" className="icon" /></a></li>
            <li><a href="#"><img src={Market} alt="Market" className="icon" /></a></li>
            <li><a href="#"><img src={Search} alt="Search" className="icon" /></a></li>
          </ul>
        </nav>
        <nav className="menu menu--bottom">
          <ul>
            <li><a href="#"><img src={Setting} alt="Settings" className="icon" /></a></li>
            <li><a href="#"><img src={Chat} alt="Chat" className="icon" /></a></li>
            <li><a href="#"><img src={Exit} alt="Exit" className="icon" /></a></li>
          </ul>
        </nav>
      </div>

      <Info />
    </div>
  );
};
