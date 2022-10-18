import { FC } from 'react'
import './About.css'


interface IAboutProps {
    aboutRef: any
}

const About: FC<IAboutProps> = ({aboutRef}) => {
    return (
        <div className='about' ref={aboutRef}>
            <div className="about_container">
                <h2>О бутике</h2>
                <div className="about_description">
                    <p>В нашем онлайн-бутике представлен исключительно качественный ассортимент. Мы не продаем товары низкого качества, только высококачественные изделия, которыми Вы будете довольны. Все товары полностью соответствуют описанию.</p>
                    
                    <img className="about_logo" src={require('../../images/logo.png')} alt="" />
                    
                </div>

            </div>
        </div>
    )
}

export default About;