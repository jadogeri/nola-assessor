import React from 'react'

const Footer = () => {
  return (
        <footer className="w-full p-4 bg-slate-100 text-center text-xs text-slate-500 border-t border-slate-200">
          © {new Date().getFullYear()} Orleans Parish Property Platform. All rights reserved.
        </footer>
  )
}

export default Footer