import { FC, useEffect, useMemo, useRef, useState, UIEvent } from 'react'
import { IImage } from '../../../redux/types/ProductType'
import './ImageSlider2.css'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import LazyImage from '../lazy-image/LazyImage'

interface ImageSliderProps {
    slides: IImage[],
    isLoading: boolean
}

let prevPosition = 0

const ImageSlider: FC<ImageSliderProps> = ({slides, isLoading}) => {

    const [currentIndex, setCurrentIndex] = useState(0)
    const [dotClick, setDotClick] = useState<boolean>(false)
    const ref: any = useRef(null)
    const sliderTrack: any = useRef(null)
    let  posX1 = 0
    let posInit = 0
    const [offset, setOffset] = useState<number>(0)
    let posX2 = 0
    let posY1 = 0
    let posY2 = 0
    const [isSwipe, setIsSwipe] = useState<boolean>(false)
    const [isScroll, setIsScroll] = useState<boolean>(false)
    const [allowSwipe, setAllowSwipe] = useState<boolean>(true)
    const [transition, setTransition] = useState<boolean>(true)
    const [nextTrf, setNextTrf] = useState<number>(0)
    const [prevTrf, setPrevTrf] = useState<number>(0)
    const trfRegExp = /([-0-9.]+(?=px))/

    const slideWidth = useMemo(() => {
        if (ref.current) {
           return ref.current.offsetWidth
        }
        return 0
    }, [ref, slides])

    const slideListWidth = useMemo(() => {
        if (ref.current) {
            return (ref.current.offsetWidth + 20) * slides.length
        }
        return 0 
    }, [ref, slides])


    const lastTrf = useMemo(() => {
        return (slides.length - 1) * slideWidth
    }, [slides, slideWidth])

    const posThreshold = useMemo (() => {
        return slideWidth * 0.35
    }, [slideWidth])
    


    useEffect(() => {
        setCurrentIndex(0)
        setOffset(0)
    }, [ref, slides])

    useEffect(() => {
        
    }, [dotClick])


    
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

    const onDotClick =  (index: number) => {
        setCurrentIndex(index)

        const listNode = sliderTrack.current

        const imgNode = listNode.querySelectorAll('div')[index]
        imgNode.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest'
            
          });
    }

    let handle: string | number | NodeJS.Timeout | null | undefined = null

    const onScrollSlider = () => {
    
        if (handle) {
            clearTimeout(handle);
       }
       handle = setTimeout(() => {
            const scrollDistance = ref.current.scrollLeft

            const index = Math.floor(scrollDistance / (slideWidth + 20))
            
            setCurrentIndex(index)
       }, 66); 
    }

    return (
        <section className='slider'>
            <div className="carousel" ref={ref} onScroll={onScrollSlider}>
                    <div className="slides"
                    ref={sliderTrack}
                    >
                        {
                        
                            isLoading ?
                                
                                <Skeleton className='slide-skeleton' />
                            
                            :
                            slides.map((slide, index) =>
                                <LazyImage src={slide.image} alt={`Product image #${index + 1}`} className='slide' skeletonClassName='slide-skeleton' key={index} />
                            )
                        }
                    </div>
            </div>

            {
                slides.length > 1 ?
                    <div className="dots_container">
                        {slides.map((_ , index) => {
                            return (
                                <div className={index === currentIndex ? "slide_dot slide_dot_active": "slide_dot"} onClick={(() => onDotClick(index))} key={index}>
                                </div>
                            )
                        })}
                    </div>
                : <></>
                
            }
        </section>
    )
}

export default ImageSlider;