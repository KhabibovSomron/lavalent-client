export function createPages(pages: number[], currentPage:number, pagesCount: number, limit: number) {
    if (pagesCount > limit) {
        let a = Math.round(limit / 2)
        if (currentPage > a) {
            for (let i = currentPage - (a - 1); i <= currentPage + a; i++) {
                pages.push(i)
                if (i === pagesCount) break
            }
        } else {
            for (let i = 1; i <= limit; i++) {
                pages.push(i)
                if (i === pagesCount) break
            }
        }
    } else {
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i)
        }
    }
}

export const pageReset = () => {
    localStorage.setItem('current_page', '1')
}