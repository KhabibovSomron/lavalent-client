import { FC, TouchEvent, useEffect, useMemo, useRef, useState } from 'react'
import { IImage } from '../../../redux/types/ProductType'
import './ImageSlider2.css'


interface ImageSliderProps {
    slides: IImage[]
}

let prevPosition = 0

const ImageSlider: FC<ImageSliderProps> = ({slides}) => {

    const [currentIndex, setCurrentIndex] = useState(1)
    const ref: any = useRef(null)
    const  [posX1, setPosX1] = useState<number>(0)
    const [offset, setOffset] = useState<number>(0)
    const [slideWidth, setSlideWidth] = useState<number>(0)
    const [slideListWidth, setSlideListWidth] = useState<number>(0)

    useEffect(() => {
        if (ref.current) {
            setSlideWidth(ref.current.offsetWidth)
            setSlideListWidth((ref.current.offsetWidth + 20) * slides.length)
        }
    }, [ref, slides])


    // const goToNext = () => {
    //     const isEndOfArray = currentIndex === slides.length - 1
    //     const newIndex = isEndOfArray ? 0: currentIndex + 1
    //     setCurrentIndex(newIndex)
    // }

    // const goToPrev = () => {
    //     const isStartOfArray = currentIndex === 0
    //     const newIndex = isStartOfArray ? slides.length - 1: currentIndex - 1
    //     setCurrentIndex(newIndex)
    // }

    const onDotClick = (index: number) => {
        setOffset(index * (slideWidth + 20))
        setCurrentIndex(index + 1)
    }

    const swipeStart = (event: TouchEvent<HTMLDivElement>) => {
        setPosX1(event.targetTouches[0].clientX)
    }

    const swipeAction = (event: TouchEvent<HTMLDivElement>) => {
        let translatePosition = Math.ceil(posX1 - event.targetTouches[0].clientX)
        if (offset + (translatePosition - prevPosition) < 0) {
            setOffset(0)
        } else if (offset + (translatePosition - prevPosition) > slideListWidth  - (slideWidth + 20)) {
            setOffset(slideListWidth - (slideWidth + 20))
        } else {
            setOffset(offset + (translatePosition - prevPosition))
        }
        prevPosition = translatePosition
   }

   const swipeEnd = (event: TouchEvent<HTMLDivElement>) => {
        prevPosition = 0
        let index = 1
        while (offset > index * (slideWidth + 20)) index += 1

        const remains = offset - (index - 1) * (slideWidth + 20)

        if (remains < (slideWidth) / 2) {
            setOffset((index - 1) * (slideWidth + 20))
            setCurrentIndex(index)
        } else {
            setOffset(index * (slideWidth + 20))
            setCurrentIndex(index + 1)
        }
   }

    return (
        <section className='slider'>
            <div className="carousel">
                <div className="images" ref={ref}
                    onTouchStart={swipeStart}
                    onTouchMove={swipeAction}
                    onTouchEnd={swipeEnd}
                >
                    <div className="slides"
                    style={{
                        transform: `translate3d(${offset * -1}px, 0px, 0px)`
                    }}
                    >
                        {slides.map((slide, index) =>
                            <img src={slide.image} key={index} alt={`Product image #${index + 1}`} className='slide' />
                        )}
                    </div>
                </div>
                {
                slides.length > 1 ?
                    <div className="dots_container">
                        {slides.map((slide, index) => {
                            return (
                                <div className={index === currentIndex - 1 ? "slide_dot slide_dot_active": "slide_dot"} onClick={(() => onDotClick(index))} key={index}>
                                </div>
                            )
                        })}
                    </div>
                : <></>
                }
            </div>
            
        </section>
    )
}

export default ImageSlider;