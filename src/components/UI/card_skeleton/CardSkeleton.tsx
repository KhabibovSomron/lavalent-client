import { FC } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import './CardSkeleton.css'

interface ICardSkeletonProps {

}

const CardSkeleton: FC<ICardSkeletonProps> = () => {
    return (
               
        <div className='card-skeleton'>
            <Skeleton className='card-skeleton-image' />
            <Skeleton className='card-skeleton-title'/>
        </div>

    )
}

export default CardSkeleton;