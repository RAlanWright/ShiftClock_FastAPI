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
            <p>Name: {shift.name}</p>
            <p>Date: {shift.date}</p>
            <p>Start Time: {shift.start_time}</p>
            <p>End Time: {shift.end_time}</p>
          </section>
        ))}
      </Stack>
    </ShiftsContext.Provider>
  )
}

// AddShift component
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
    event.preventDefault()
    const newShift = {
      'id': shifts.length + 1,
      'name': name,
      'date': date,
      'startTime': start_time,
      'endTime': end_time
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

// UpdateShift component
function UpdateShift({ name, date, start_time, end_time, id }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [shift, setShift] = useState({ name, date, start_time, end_time })
  const { fetchShifts } = React.useContext(ShiftsContext)

  const updateShift = async () => {
    await fetch(`http://localhost:8000/shift/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: shift, date: shift, start_time: shift, end_time: shift })
    })
    onClose()
    await fetchShifts()
  }

  // Return a modal for editing the shift
  return (
    <>
      <Button h='1.5rem' size='sm' onClick={onOpen}>Edit Shift</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Shift</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <InputGroup size='md'>
              <Input
                pr='4.5rem'
                type='text'
                placeholder='Date'
                aria-label='Date'
                value={shift}
                onChange={e => setShift(e.target.value)}
              />
              <Input
                pr='4.5rem'
                type='text'
                placeholder='In'
                aria-label='In'
                value={shift}
                onChange={e => setShift(e.target.value)}
              />
              <Input
                pr='4.5rem'
                type='text'
                placeholder='Out'
                aria-label='Out'
                value={shift}
                onChange={e => setShift(e.target.value)}
              />
            </InputGroup>
          </ModalBody>

          <ModalFooter>
            <Button h='1.5rem' size='sm' onClick={updateShift}>Save</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

// ShiftHelper component
function ShiftHelper({ name, date, start_time, end_time, id, fetchShifts }) {
  return (
    <Box p={1} shadow='sm'>
      <Flex justify='space-between'>
        <Text mt={4} as='section'>
          {{ name, date, start_time, end_time }}
          <Flex align='end'>
            <UpdateShift name={name} date={date} start_time={start_time} end_time={end_time} id={id} fetchShifts={fetchShifts} />
          </Flex>
        </Text>
      </Flex>
    </Box>
  )
}