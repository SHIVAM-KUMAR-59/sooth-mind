'use client'

import { useRouter } from "next/router"

const Profile = () => {
    const router = useRouter()
    const {id} = router.query;

    return <h1>Profile: {id}</h1>
}

export default Profile