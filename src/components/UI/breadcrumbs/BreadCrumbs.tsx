import { FC } from 'react'
import { Link } from 'react-router-dom'
import { IBreadCrumbs } from '../../../redux/types/BreadCrumbsType'
import './BreadCrumbs.css'


interface IBreadCrumbsProps {
    links: IBreadCrumbs[]
}

const BreadCrumbs: FC<IBreadCrumbsProps> = ({ links }) => {

    return (
        <div className='breadcrumbs'>
            {links.map((link, index) =>
            {
                if (index !== links.length - 1) {
                    return (
                        <div key={index}>
                            <Link to={link.url} className="breadcrumbs_links">{link.title}</Link>
                            <span className='slice'>/</span>
                        </div>
                    )
                } else {
                    return (
                        <div key={index}>
                            <Link to={link.url} className="breadcrumbs_links">{link.title}</Link>
                        </div> 
                    )
                } 
            } 
            )}

        </div>
    )
}

export default BreadCrumbs;