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
      <Stack spacing={5}>
        {shifts.map((shift) => (
          <li key={shift.id}>
            <b>{shift.date}</b>
            <p>Clocked In: {shift.clockedIn}</p>
            <p>Clocked Out: {shift.clockedOut}</p>
          </li>
          ))}
      </Stack>
    </ShiftsContext.Provider>
  )
}
