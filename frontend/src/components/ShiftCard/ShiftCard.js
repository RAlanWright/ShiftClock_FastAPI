import React from 'react'
import {
  EuiBadge,
  EuiButton,
  EuiCard,
  EuiFlexGroup,
  EuiFlexItem,
  EuiText,
  EuiSpacer,
  EuiLoadingChart
} from '@elastic/eui'
import styled from 'styled-components'

const ImageHolder = styled.div`
  min-width: 400px;
  min-height: 200px;

  & > img {
    position: relative;
    z-index: 2;
  }
`


export default function ShiftCard({ shift }) {
  const image = (
    <ImageHolder>
      <EuiLoadingChart size='xl' style={{ position: 'absolute', zIndex: 1 }} />
      <img src='https://source.unsplash.com/400x200/?Soap' alt='Shift Cover' />
    </ImageHolder>
  )

  const title = (
    <EuiFlexGroup justifyContent='spaceBetween' alignItems='center'>
      <EuiFlexItem grow={false}>{shift.name}</EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiBadge color='secondary'>
          {[shift.name]}
        </EuiBadge>
      </EuiFlexItem>
    </EuiFlexGroup>
  )

  const footer = (
    <>
      <EuiSpacer />
      <EuiFlexGroup justifyContent='spaceBetween' alignItems='flexEnd'>
        <EuiFlexItem grow={false}>
          <EuiText>Date: ${shift.date}</EuiText>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiButton>Button</EuiButton>
        </EuiFlexItem>
      </EuiFlexGroup>
    </>
  )

  return (
    <EuiCard
      display='plain'
      textAlign='left'
      image={image}
      title={title}
      description={shift.description}
      footer={footer}
    />
  )
}
