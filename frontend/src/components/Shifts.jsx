import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure
} from '@chakra-ui/react'

const ShiftsContext = React.createContext({
  shifts: [], fetchShifts: () => {
  }
})

export default function Shifts() {
  const [shifts, setShifts] = useState([])
  const fetchShifts = async () => {
    const response = await fetch('http://localhost:8000/shift')
    const shifts = await response.json()
    setShifts(shifts.data)
  }
  useEffect(() => {
    fetchShifts()
  }, [])
  return (
    <ShiftsContext.Provider value={{ shifts, fetchShifts }}>
      <AddShift />
      <Stack spacing={5}>
        {shifts.map((shift) => (
          <section key={shift.id}>
            <p>Date: {shift.date}</p>
            <p>Start Time: {shift.startTime}</p>
            <p>End Time: {shift.endTime}</p>
          </section>
        ))}
      </Stack>
    </ShiftsContext.Provider>
  )
}

function AddShift() {
  const [date, setDate] = React.useState('')
  const [startTime, setStartTime] = React.useState('')
  const [endTime, setEndTime] = React.useState('')
  const { shifts, fetchShifts } = React.useContext(ShiftsContext)

  // const handleInput = event => {
  //   setDate(event.target.value)
  //   setStartTime(event.target.value)
  //   setEndTime(event.target.value)
  // }

  const handleDate = event => {
    setDate(event.target.value)
  }

  const handleStartTime = event => {
    setStartTime(event.target.value)
  }

  const handleEndTime = event => {
    setEndTime(event.target.value)
  }

  const handleSubmit = (event) => {
    const newShift = {
      'id': shifts.length + 1,
      'date': date,
      'startTime': startTime,
      'endTime': endTime
    }
    fetch('http://localhost:8000/shift', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newShift)
    }).then(fetchShifts)
  }
  return (
    <form>
      <InputGroup size='md'>
        <Input
          pr='4.5rem'
          type='text'
          placeholder='Enter the date'
          aria-label='Date'
          isRequired='True'
          onChange={handleDate}
        />
        <Input
          pr='4.5rem'
          type='text'
          placeholder='In'
          aria-label='In'
          isRequired='True'
          onChange={handleStartTime}
        />
        <Input
          pr='4.5rem'
          type='text'
          placeholder='Out'
          aria-label='Out'
          isRequired='True'
          onChange={handleEndTime}
        />
        <Input type='submit' value='Submit' onClick={handleSubmit} />
      </InputGroup>
    </form>
  )
}

function UpdateShift({date, startTime, endTime, id}) {
  const {isOpen, onOpen, onClose} = useDisclosure()
  const [shift, setShift] = useState({date, startTime, endTime})
  const {fetchShifts} = React.useContext(ShiftsContext)
}