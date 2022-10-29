import { ChangeEvent, FC } from 'react'
import './Ordering.css'


interface IOrderingProps {
    value: string,
    setValue: Function
}

const Ordering: FC<IOrderingProps> = ({value, setValue}) => {
    
    const onSelectOrder = (event: ChangeEvent<HTMLSelectElement>) => {
        setValue(event.target.value)
    }

    return(
       <div className='ordering'>
    
            {/* <label htmlFor="order_select_id" className='ordering_title'>Сортировка</label> */}
            <select name="order_select" id="order_select_id" defaultValue='sort' onChange={onSelectOrder}>
                <option value="sort" disabled hidden>Сортировка по</option>
                <option value="price">Цена: от низкой к высокой</option>
                <option value="-price">Цена: от высокой к низкой</option>
                <option value="vendor_code">Название: от А к Я</option>
                <option value="-vendor_code">Название: от Я к А</option>
            </select>
        
       </div> 
    )
}

export default Ordering;