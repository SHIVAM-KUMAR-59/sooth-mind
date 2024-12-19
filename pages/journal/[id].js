'use client'

import { useRouter } from 'next/router'

const Journal = () => {
    const router = useRouter()
    const { id } = router.query

    return <h1>Journal ID: {id}</h1>
}

export default Journal
