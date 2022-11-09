import { FC, useState } from 'react'
import { IImage } from '../../../redux/types/ProductType'
import './ImageSlider.css'


interface ImageSliderProps {
    slides: IImage[]
}

const ImageSlider: FC<ImageSliderProps> = ({slides}) => {

    const [currentIndex, setCurrentIndex] = useState(0)
    const [startPoint, setStartPoint] = useState(0)
    const [endPoint, setEndPoint] = useState(0)

    const goToNext = () => {
        const isEndOfArray = currentIndex === slides.length - 1
        const newIndex = isEndOfArray ? 0: currentIndex + 1
        setCurrentIndex(newIndex)
    }

    const goToPrev = () => {
        const isStartOfArray = currentIndex === 0
        const newIndex = isStartOfArray ? slides.length - 1: currentIndex - 1
        setCurrentIndex(newIndex)
    }

    const onDragStartHandler = () => {
        console.log("hello World!")
    }

    return (
        <section className='slider'>
            <div className="carousel" onTouchMove={onDragStartHandler}>
                <div className="slider_right_arrow slider_arrow" onClick={goToNext}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-chevron-compact-right carousel_svg" viewBox="0 0 16 16"> <path fillRule="evenodd" d="M6.776 1.553a.5.5 0 0 1 .671.223l3 6a.5.5 0 0 1 0 .448l-3 6a.5.5 0 1 1-.894-.448L9.44 8 6.553 2.224a.5.5 0 0 1 .223-.671z"/> </svg>
                </div>
                <div className="slider_left_arrow slider_arrow" onClick={goToPrev}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-chevron-compact-left carousel_svg" viewBox="0 0 16 16"> <path fillRule="evenodd" d="M9.224 1.553a.5.5 0 0 1 .223.67L6.56 8l2.888 5.776a.5.5 0 1 1-.894.448l-3-6a.5.5 0 0 1 0-.448l3-6a.5.5 0 0 1 .67-.223z"/> </svg>
                </div>
                <ul>
                    {slides.map((slide, index) => {
                        return (
                        <li className={index === currentIndex ? 'slide slide_active': 'slide' } key={index}>
                                <img src={slide.image} alt={`Product image #${index + 1}`} />
                        </li> 
                        )
                    })}
                </ul>
                
                <div className="dots_container">
                    {slides.map((slide, index) => {
                        return (
                            <div className={index === currentIndex ? "slide_dot slide_dot_active": "slide_dot"} onClick={(() => setCurrentIndex(index))} key={index}>
                            </div>
                        )
                    })}
                </div>
            </div>
            
        </section>
    )
}

export default ImageSlider;