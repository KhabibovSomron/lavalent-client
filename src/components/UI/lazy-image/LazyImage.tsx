import { FC, useState, useEffect, useRef } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import './LazyImage.css'

interface ILazyImageProps {
    className: string,
    skeletonClassName: string,
    src: string,
    alt: string
}

const LazyImage:FC<ILazyImageProps> = ({className, skeletonClassName, src, alt}) => {
    const [isLoaded, setIsLoaded] = useState<boolean>(false)
    const ref = useRef<HTMLImageElement | null>(null)


    useEffect(() => {
        if(ref.current !== null) {
            ref.current.onload = () => setIsLoaded(true)
        }
    }, [])

    return(
            <div>
    
                    <img className={className} src={src} alt={alt} ref={ref} style={!isLoaded ? {display: 'none'}: {}} />
        
                    <Skeleton className={skeletonClassName} style={isLoaded ? {display: 'none'}: {}} />

            </div>
    )
} 

export default LazyImage;