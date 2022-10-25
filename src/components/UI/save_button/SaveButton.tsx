import { FC, useState } from 'react'
import { useAppDispatch } from '../../../hooks/ReduxHooks'
import { categoryListSlice } from '../../../redux/reducers/CategorySlices'
import { IFavoriteList } from '../../../redux/types/ProductType'
import './SaveButton.css'


interface ISaveButtonProps {
    isFavorite: boolean,
    id: number
}

const SaveButton: FC<ISaveButtonProps> = ({isFavorite, id}) => {

    const [isClicked, setIsClicked] = useState<boolean>(isFavorite)
    const dispatch = useAppDispatch()
    
    const onSaveClickHandler = (id: number) => {
        
        let list = localStorage.getItem('fav_list')

        if (list) {
            let obj: IFavoriteList = JSON.parse(list)

            if (isClicked) {
                obj.products = obj.products.filter(state => state !== id)  
                setIsClicked(false)  
            } else {
                obj.products.push(id)
                setIsClicked(true)
            }
            localStorage.setItem('fav_list', JSON.stringify(obj))
            dispatch(categoryListSlice.actions.setFavoriteCount(obj.products.length))
        } else {
            const obj: IFavoriteList = {
                products: [id]
            }
            localStorage.setItem('fav_list', JSON.stringify(obj))
            dispatch(categoryListSlice.actions.setFavoriteCount(obj.products.length))
            setIsClicked(true)
        }
    }


    return (
        <button className='save_button' onClick={() => onSaveClickHandler(id)}>
        <span className="card_save_button_svg">
            {!isClicked ?
                <svg viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg"><path d="M11.363 16.152a.531.531 0 0 0-.013-.013l.013.013zm-.713-.013l.012-.011a.405.405 0 0 0-.012.011zm4.854-4.674a6.124 6.124 0 0 0 .781-.908c.453-.647.715-1.3.715-1.9C17 6.924 16.055 6 14.266 6c-.786 0-1.724.57-2.563 1.4L11 8.092l-.703-.694C9.458 6.57 8.52 6 7.734 6 5.945 6 5 6.925 5 8.656c0 1.043.776 2.167 1.476 2.78L11 15.803l4.504-4.337zM18 8.656c0 1.875-1.719 3.446-1.79 3.516l-4.866 4.687A.485.485 0 0 1 11 17a.485.485 0 0 1-.344-.14l-4.875-4.704C5.72 12.102 4 10.531 4 8.656 4 6.367 5.398 5 7.734 5 9.102 5 10.383 6.078 11 6.688 11.617 6.077 12.898 5 14.266 5 16.602 5 18 6.367 18 8.656z" fillRule="evenodd"></path></svg>
            :
                <svg className='card_save_button_svg_active' viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg"><path d="M18 8.656c0 1.875-1.719 3.446-1.79 3.516l-4.866 4.687A.485.485 0 0 1 11 17a.485.485 0 0 1-.344-.14l-4.875-4.704C5.72 12.102 4 10.531 4 8.656 4 6.367 5.398 5 7.734 5 9.102 5 10.383 6.078 11 6.688 11.617 6.077 12.898 5 14.266 5 16.602 5 18 6.367 18 8.656z" fillRule="evenodd"></path></svg>
            }
            
        </span>
        <span className="save_button_title">В {isClicked ? 'избранном': 'избранное'}</span>
    </button>
    )
}

export default SaveButton;