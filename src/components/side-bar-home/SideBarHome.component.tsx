import './SideBarHome.css';   
import { ReactComponent as IconLogo } from '../../assets/icons/logo.svg';
import { ReactComponent as IconMoon } from '../../assets/icons/icon-moon.svg';
import { ReactComponent as IconSun } from '../../assets/icons/icon-sun.svg';

function SideBarHomeComponent(props: any) {
    return(
        <div className='side-bar-home-container'>
            <div className='logo-container'>
                <div className='icon-container'>
                    <IconLogo transform='scale(1.3)' />
                </div>
                <div className='half-bottom-color'>
                </div>
            </div>
            <div className='profile-container'>
                
                    {
                        props.isDarkTheme ? 
                        <div onClick={() => props.setDarkTheme(false)} className='dark-light-button'>
                            <IconSun  />
                        </div>
                        :
                        <div onClick={() => props.setDarkTheme(true)} className='dark-light-button'>
                            <IconMoon  />
                        </div>
                    }
                <div className='divider'></div>
                <img className='avatar' src={require('../../assets/icons/image-avatar.jpg')} />
            </div>
        </div>
    );
}

export default SideBarHomeComponent;