import { FC } from 'react'
import './Info.css'


interface IInfoProps {

}

const Info: FC<IInfoProps> = () => {
    return (
        <div className='info'>
            <div className="info_container">
                <h2>Почему мы?</h2>
                <div className="info_description">
                    <p>Мы любим своё дело</p>
                    <p>Весь представленный  ассортимент из натуральных материалов высокого качества</p>
                    <p>Если в описании указан материал - натуральная кожа, Вы действительно получите изделие из натуральной кожи</p>
                    <p>Доставляем в любую точку мира, курьером на дом. Сотрудничаем с <b>Express Mail Service (EMS)</b></p>
                    <p>Новое поступление каждую пятницу. Заказы отправляем дважды в неделю</p>
                    <p>Склад в Минске и в Риге для более быстрой доставки в любую точку мира</p>
                </div>
            </div>
        </div>
    )
}

export default Info;