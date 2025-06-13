import { useState } from 'react'
import { toast } from 'sonner'

export const InfoItem: React.FC<{
  icon: React.ReactNode
  label: string
  value: string
  delay?: number
}> = ({ icon, label, value, delay = 0 }) => {
  const [isCopied, setIsCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(value)
    if (isCopied) return
    setIsCopied(true)
    toast.success(`Copiado ${label}`)
    setTimeout(() => {
      setIsCopied(false)
    }, 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className='flex items-center gap-4 p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-white/20 cursor-copy hover:scale-[1.02] transition-all duration-300 animate-fade-in group'
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className='flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center text-white group-hover:from-primary-600 group-hover:to-primary-700 transition-all duration-300'>
        {icon}
      </div>
      <div className='min-w-0'>
        <p className='text-sm font-medium text-gray-600 mb-1'>{label}</p>
        <p className='text-gray-900 font-semibold truncate'>{value}</p>
      </div>
    </button>
  )
}
