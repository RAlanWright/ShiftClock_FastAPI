import React from 'react'
import { ShiftsHome, ShiftView, NotFoundPage } from '../../components'
import { Routes, Route } from 'react-router-dom'

export default function ShiftsPage() {
  return (
    <>
      <Routes>
        <Route path='/' element={<ShiftsHome />} />
        <Route path=':shift_id' element={<ShiftView />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </>
  )
}
