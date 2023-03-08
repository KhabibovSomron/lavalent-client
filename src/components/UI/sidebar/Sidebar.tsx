import { FC } from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../../hooks/ReduxHooks'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import './Sidebar.css'


interface ISidebarProps {
    isActive: boolean,
    setIsActive: Function,
    sideRef: any
}

const Sidebar: FC<ISidebarProps> = ({ isActive, setIsActive, sideRef }) => {

    const categories = useAppSelector(state => state.categoryList.categories)
    const isLoading = useAppSelector(state => state.categoryList.isLoading)

    return (
            <div className={isActive ? "sidebar_container sidebar_container_active" : "sidebar_container"} ref={sideRef}>
                {
                    isLoading ?
                        Array(3).fill(0).map((item, index) =>
                            <Skeleton className='sidebar_links_skeleton' key={index} />
                        )
                    : 
                        categories.map((category, index) =>
                            <Link to={`/${category.id}/brands/`} className='sidebar_links' key={index} onClick={() => setIsActive(false)} >{category.title}</Link>
                        )
                }
            </div>
        

    )
}

export default Sidebar;