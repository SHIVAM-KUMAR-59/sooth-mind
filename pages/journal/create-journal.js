import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]'
import InputField from '@/components/InputField'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import { EditorState, RichUtils } from 'draft-js'
import 'draft-js/dist/Draft.css'
import '@/app/globals.css'
import axios from 'axios'

// Dynamically import the Editor to prevent SSR issues
const Editor = dynamic(() => import('draft-js').then((mod) => mod.Editor), {
  ssr: false,
})

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions)

  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    }
  }

  const sanitizedSession = {
    ...session,
    user: {
      ...session.user,
      id: session.user.id?.toString() || null,
      image: session.user.image || null,
    },
  }

  return {
    props: { session: sanitizedSession },
  }
}

const CreateJournal = ({ session }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(),
  )
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    setIsLoading(true)

    // Extract plain text from the editor
    const plainText = editorState.getCurrentContent().getPlainText()
    if (!plainText.trim()) {
      console.error('Content is empty')
      setIsLoading(false)
      return
    }

    data.content = plainText
    data.userId = session.user.id

    try {
      const response = await axios.post('/api/create-journal', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })

      // Reset editor and form
      setEditorState(EditorState.createEmpty())
      reset()
    } catch (error) {
      if (error.response) {
        alert('Error: ' + error.response.data.error)
      } else {
        alert('Error: ' + error.message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditorChange = (newState) => {
    setEditorState(newState)
  }

  const toggleInlineStyle = (style) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style))
  }

  const toggleBlockType = (blockType) => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType))
  }

  return (
    <div className="bg-gray-500 min-h-screen flex flex-col items-center py-10 border-2 border-black">
      <h1 className="text-3xl font-bold mb-6">Create Journal</h1>
      <p className="text-lg mb-4">Welcome, {session.user.name}</p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl"
      >
        <InputField
          label="title"
          type="text"
          placeholder="Enter your title"
          register={register}
          validation={{ required: 'Title is required' }}
          error={errors.title}
        />
        <InputField
          label="description"
          type="text"
          placeholder="Enter your description"
          register={register}
          validation={{ required: 'Description is required' }}
          error={errors.description}
        />

        {/* Draft.js Editor */}
        <div className="mt-4">
          <label className="block text-gray-700 font-bold mb-2">Content</label>
          <div className="mb-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => toggleInlineStyle('BOLD')}
              className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
            >
              Bold
            </button>
            <button
              type="button"
              onClick={() => toggleInlineStyle('ITALIC')}
              className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
            >
              Italic
            </button>
            <button
              type="button"
              onClick={() => toggleInlineStyle('UNDERLINE')}
              className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
            >
              Underline
            </button>
            <button
              type="button"
              onClick={() => toggleBlockType('header-one')}
              className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
            >
              H1
            </button>
            <button
              type="button"
              onClick={() => toggleBlockType('header-two')}
              className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
            >
              H2
            </button>
            <button
              type="button"
              onClick={() => toggleBlockType('blockquote')}
              className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
            >
              Blockquote
            </button>
          </div>
          <div className="border border-gray-300 rounded p-4 min-h-[200px] bg-white">
            <Editor editorState={editorState} onChange={handleEditorChange} />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`mt-6 w-full py-2 text-white font-bold rounded ${
            isLoading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {isLoading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  )
}

export default CreateJournal
