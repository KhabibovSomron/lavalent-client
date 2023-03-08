import {useEffect, useRef, useState} from 'react'

export default function useOutsideBarAlerter(initialIsVisible: boolean) {
    const sideBarRef: any = useRef(null)
    const [isSidebarActive, setIsSidebarActive] = useState<boolean>(initialIsVisible)

    const handleClickOutside = (event: any) => {
        if (sideBarRef.current && !sideBarRef.current.contains(event.target)) {
            setIsSidebarActive(false)
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true)
        return () => {
            document.removeEventListener('click', handleClickOutside, true)
        }
    })

    return { sideBarRef, isSidebarActive, setIsSidebarActive}
}