import React from 'react'

const loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center h-[100vh] bg-opacity-50 z-50">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-500"></div>
    </div>
  )
}

export default loading
