import { useRouter } from 'next/router'

const Journal = () => {
  const router = useRouter()
  const { id } = router.query
  if (!id) {
    return <div>Not Found</div>
  }

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`/api/delete-journal/${id}`)
      console.log(response)
      router.push('/')
    } catch (error) {
      console.error(error)
    }
  }
  return <button onClick={handleDelete}>Delete Journal</button>
}
