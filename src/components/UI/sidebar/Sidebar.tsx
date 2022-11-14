import { FC } from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../../hooks/ReduxHooks'
import './Sidebar.css'


interface ISidebarProps {
    isActive: boolean,
    setIsActive: Function,
    sideRef: any
}

const Sidebar: FC<ISidebarProps> = ({ isActive, setIsActive, sideRef }) => {

    const categories = useAppSelector(state => state.categoryList.categories)

    return (
            <div className={isActive ? "sidebar_container sidebar_container_active" : "sidebar_container"} ref={sideRef}>
                {categories.map((category, index) =>
                    <Link to={`/${category.id}/brands/`} className='sidebar_links' key={index} onClick={() => setIsActive(false)} >{category.title}</Link>
                )}
            </div>
        

    )
}

export default Sidebar;