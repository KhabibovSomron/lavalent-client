import { FC } from 'react'
import './Contacts.css'


interface IContactsProps {
    contactRef: any
}

const Contacts: FC<IContactsProps> = ({contactRef}) => {
    return (
        <div className='contacts' ref={contactRef}>
            <div className='social_media'>
                <div className='instagram'>
                    <div className='logo'></div>
                    <a href='https://instagram.com/lavalent.eu?igshid=YmMyMTA2M2Y=' target='_blank' className='contact_links' rel="noopener">@lavalent.eu</a>
                </div>
                <div className='telegram'>
                    <div className='logo'></div>
                    <a href='https://t.me/Lavalentbags' className='contact_links' target='_blank' rel="noopener">Телеграм</a>
                    </div>
            </div>
        </div>
    )
}

export default Contacts;