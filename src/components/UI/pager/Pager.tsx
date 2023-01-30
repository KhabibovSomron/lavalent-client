import { FC, useState, useMemo } from 'react'
import { createPages } from '../../utils/pageCreator'
import './Pager.css'


interface IPagerProps {
    offset: number,
    limit: number,
    onClickHandler: Function
}

const Pager: FC<IPagerProps> = ({offset, onClickHandler, limit}) => {

    const [activePage, setActivePage] = useState(1)
    const [pageLimit, setPageLimit] = useState(window.innerWidth < 650 ? 3 : 7)
    window.addEventListener("resize", () => {
        if (window.innerWidth < 650) {
            setPageLimit(3)
        } else {
            setPageLimit(7)
        }
    })

    const pagesCount = useMemo(() =>  {
        const result = offset / limit
        return Math.ceil(result)
    }, [offset, limit])

    const pages: number[] = []

    createPages(pages, activePage, pagesCount, pageLimit)

    const onPageClickHandler = (page: number) => {
        setActivePage(page)
        onClickHandler(page)
    }

    return (
        <div className="pager">
            <div className="pager_header">
                {limit * activePage - limit + 1} - {limit * activePage <= offset ? limit * activePage: offset} из {offset}
            </div>
            <div className="pager_body">
                
                <div className={activePage !== 1 ? "pager_body_back": "pager_body_back button_opacity"} onClick={
                    () => {
                        if (activePage !== 1) 
                            onPageClickHandler(activePage - 1)
                    }
                }>
                <span className="pager_body_back_icon">
                        <svg className='pager_body_back_svg' viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg"><path d="M18.5 3.85l-8.9 9.02 8.9 9.27c.66.65.66 1.71 0 2.36-.67.65-1.74.65-2.4 0L6 14.06c-.33-.33-.5-.76-.5-1.18 0-.43.17-.86.5-1.18L16.1 1.49c.66-.65 1.74-.65 2.41 0 .66.65.66 1.71-.01 2.36z"></path></svg>
                    </span>
                    <span className="pager_body_back_text">НАЗАД</span>
                </div>

                <div className="pager_body_pages">
                    {pages.map((page, index) =>
                        <div key={index} className={activePage === page ? 'page_active': 'pager_body_pages_items'} onClick={() => onPageClickHandler(page)}>
                            {page}
                        </div>
                    )}
                    {pagesCount > pageLimit && pages[pages.length - 1] !== pagesCount ? 
                        <div className='pager_body_pages_items' onClick={() => onPageClickHandler(pages[pages.length - 1] + 1)}>
                            ...
                        </div>
                        : <></>
                    }
                </div>
                
                <div className={activePage !== pagesCount ? "pager_body_forward": "pager_body_forward button_opacity"} onClick={
                    () => {
                         if (activePage !== pagesCount) 
                            onPageClickHandler(activePage + 1)
                    }
                }>
                    <span className="pager_body_forward_text">ДАЛЕЕ</span>
                    <span className="pager_body_forward_icon">
                        <svg className='pager_body_forward_svg' viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 22.15l8.9-9.02-8.9-9.28c-.66-.65-.66-1.71 0-2.36.67-.65 1.74-.65 2.4 0L20 11.94c.33.33.5.76.5 1.18 0 .43-.17.86-.5 1.18L9.9 24.51c-.66.65-1.74.65-2.41 0-.66-.65-.66-1.71.01-2.36z"></path></svg>
                    </span>

                </div>

            </div>
        </div>
    )
}

export default Pager;