import { useEffect, useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { jsPDF } from 'jspdf'
import Papa from 'papaparse'
import Link from 'next/link'
import html2canvas from 'html2canvas'
import '@/app/globals.css'
import '@/app/styles.css'

const JournalData = () => {
  const [journal, setJournal] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const id = sessionStorage.getItem('journalId')
    if (!id) {
      setError('No journal ID found in session storage')
      setLoading(false)
      return
    }

    const getJournal = async () => {
      try {
        const response = await fetch(`/api/get-journal/${id}`)
        if (!response.ok) throw new Error('Failed to fetch journal')
        const data = await response.json()
        setJournal(data)
      } catch (err) {
        setError(err.message || 'Something went wrong')
      } finally {
        setLoading(false)
      }
    }
    getJournal()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-red-500 text-xl font-bold mb-2">Error</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    )
  }

  if (!journal) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-2">Not Found</h2>
          <p className="text-gray-600">Journal not found</p>
        </div>
      </div>
    )
  }

  // Prepare sentiment data for chart
  const sentimentData = [
    {
      name: 'Sentiment',
      negative: journal.chartData?.negative || 0,
      neutral: journal.chartData?.neutral || 0,
      positive: journal.chartData?.positive || 0,
    },
  ]

  // Function to generate PDF
  const generatePDF = async () => {
    const doc = new jsPDF()

    // Title and Journal Info
    doc.setFontSize(16)
    doc.text('Journal Report', 14, 20)
    doc.setFontSize(12)
    doc.text(`Title: ${journal.title || 'Untitled Journal'}`, 14, 30)
    doc.text(
      `Created At: ${new Date(journal.createdAt).toLocaleDateString()}`,
      14,
      40,
    )
    doc.text(`ID: ${journal.id}`, 14, 50)
    doc.text(
      `Description: ${journal.description || 'No description provided'}`,
      14,
      60,
    )

    // Sentiment Analysis Section
    doc.addPage()
    doc.setFontSize(14)
    doc.text('Sentiment Analysis', 14, 20)
    doc.setFontSize(12)
    doc.text(
      `Negative Sentiment: ${(journal.chartData?.negative || 0).toFixed(2)}`,
      14,
      30,
    )
    doc.text(
      `Neutral Sentiment: ${(journal.chartData?.neutral || 0).toFixed(2)}`,
      14,
      40,
    )
    doc.text(
      `Positive Sentiment: ${(journal.chartData?.positive || 0).toFixed(2)}`,
      14,
      50,
    )

    // Capture and Add Chart Image
    const chartElement = document.querySelector('.recharts-wrapper')
    if (chartElement) {
      const canvas = await html2canvas(chartElement)
      const imgData = canvas.toDataURL('image/png')
      doc.addPage()
      doc.text('Sentiment Chart', 14, 20)
      doc.addImage(imgData, 'PNG', 14, 30, 180, 90) // Adjust size as needed
    } else {
      console.error('Chart element not found')
    }

    // Overall Sentiment Section
    doc.addPage()
    doc.setFontSize(14)
    doc.text('Overall Sentiment', 14, 20)
    doc.setFontSize(12)
    doc.text(`Label: ${journal.sentiment?.label}`, 14, 30)
    doc.text(`Score: ${journal.sentiment?.score.toFixed(2)}`, 14, 40)
    doc.text(`Magnitude: ${journal.sentiment?.magnitude.toFixed(2)}`, 14, 50)

    // Save PDF
    doc.save('journal-report.pdf')
  }

  // Function to download CSV
  const generateCSV = () => {
    const data = [
      {
        Sentiment: 'Negative',
        Score: (journal.chartData?.negative || 0).toFixed(2),
      },
      {
        Sentiment: 'Neutral',
        Score: (journal.chartData?.neutral || 0).toFixed(2),
      },
      {
        Sentiment: 'Positive',
        Score: (journal.chartData?.positive || 0).toFixed(2),
      },
    ]
    const csv = Papa.unparse(data)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'sentiment-report.csv'
    link.click()
  }

  return (
    <div className="min-h-screen bg-gradient-to-t from-[#B8C9E1] to-[#EAF3F5] py-8 px-4">
      <Link
        href="/"
        className="absolute top-0 left-0 mt-4 ml-4 text-white inter-regular bg-black bg-opacity-35 px-4 py-2 rounded-md text-[20px] hover:scale-105 hover:bg-opacity-70 transition-all duration-200"
      >
        Home
      </Link>
      <div className="max-w-4xl mx-auto space-y-6 mt-5">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-gray-800">
              {journal.title || 'Untitled Journal'}
            </h1>
            <div className="flex items-center text-sm text-gray-500">
              <span>{new Date(journal.createdAt).toLocaleDateString()}</span>
              <span className="mx-2">•</span>
              <span>ID: {journal._id}</span>
            </div>
            <p className="text-gray-600 whitespace-pre-wrap ">
              {journal.description || 'No description provided'}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4 text-zinc-600">
            Sentiment Analysis
          </h2>
          <div className="h-64 ">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sentimentData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="negative" fill="#ff0000" name="Negative" />
                <Bar dataKey="neutral" fill="#808080" name="Neutral" />
                <Bar dataKey="positive" fill="#22C55E" name="Positive" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-red-400 rounded-lg">
              <p className="text-sm text-white ">Negative</p>
              <p className="font-bold">
                {(journal.chartData?.negative || 0).toFixed(2)}
              </p>
            </div>
            <div className="p-3 bg-gray-500 rounded-lg">
              <p className="text-sm text-white">Neutral</p>
              <p className="font-bold">
                {(journal.chartData?.neutral || 0).toFixed(2)}
              </p>
            </div>
            <div className="p-3 bg-green-500 rounded-lg">
              <p className="text-sm text-white">Positive</p>
              <p className="font-bold">
                {(journal.chartData?.positive || 0).toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4 text-zinc-600">
            Overall Sentiment
          </h2>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Label:</span>
              <span className="font-medium text-gray-600">
                {journal.sentiment?.label}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Score:</span>
              <span className="font-medium text-gray-600">
                {journal.sentiment?.score.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Magnitude:</span>
              <span className="font-medium text-gray-600">
                {journal.sentiment?.magnitude.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={generatePDF}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg"
          >
            Download PDF
          </button>
          <button
            onClick={generateCSV}
            className="bg-green-500 text-white py-2 px-4 rounded-lg"
          >
            Download CSV
          </button>
        </div>
      </div>
    </div>
  )
}

export default JournalData
