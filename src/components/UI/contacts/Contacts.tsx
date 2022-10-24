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
                    <a href='/' className='contact_links'>@lavalent.eu</a>
                </div>
                <div className='telegram'>
                    <div className='logo'></div>
                    <a href='/' className='contact_links'>Телеграм</a>
                    </div>
            </div>
        </div>
    )
}

export default Contacts;