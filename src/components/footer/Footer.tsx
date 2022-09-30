import { FC } from 'react'
import './Footer.css'


interface IFooterProps {

}

const Footer: FC<IFooterProps> = () => {
    return (
        <div className='footer'>
            <div className='footer_container'>
                <div className="media">
                    <div>Vkontakte</div>
                    <div>Vkontakte</div>
                    <div>Vkontakte</div>
                    <div>Vkontakte</div>
                </div>
                <div className="copyright">
                    <span className='copyright_store'>© Copyright 2019-2022 Lavalent LLC. All rights reserved</span>
                    <span className='copyright_abuse_report'><a>Сообщить о нарушении</a></span>
                </div>
            </div>
        </div>
    )
}

export default Footer;