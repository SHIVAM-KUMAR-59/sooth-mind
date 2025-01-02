import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

const data = () => {
  const router = useRouter()

  useEffect(() => {
    if (!router.isReady) return

    const { id } = router.query
  }, [id])

  return <div>data</div>
}

export default data
