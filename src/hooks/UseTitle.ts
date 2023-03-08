import {useEffect} from 'react'

export default function useTitle(title: string, resetOnUnmount: boolean = true) {
    useEffect(() => {
        if (!resetOnUnmount) return
        let initialTitle = document.title

        return () => {
            document.title = initialTitle
        }
    }, [resetOnUnmount])

    useEffect(() => {
        document.title = title;
    }, [title])
}