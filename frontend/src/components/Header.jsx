import React from 'react'
import { Heading, Flex, Divider } from '@chakra-ui/react'

const Header = () => {
  return (
    <Flex
      as='nav'
      align='center'
      justify='space-between'
      wrap='nowrap'
      padding='0.5rem'
      bgColor='gray'
    >
      <Flex align='center' mr={5}>
        <Heading as='h1' size='md'>Shift Clock</Heading>
        <Divider />
      </Flex>
    </Flex>
  )
}

export default Header