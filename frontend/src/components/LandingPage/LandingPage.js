import React from 'react'
import { EuiPage, EuiPageBody, EuiPageContent, EuiPageContentBody, EuiFlexGroup, EuiFlexItem } from '@elastic/eui'
import styled from 'styled-components'

const StyledEuiPage = styled(EuiPage)`
  flex: 1;
`

const StyledEuiPageContent = styled(EuiPageContent)`
  border-radius: 50%;
`
const StyledEuiPageContentBody = styled(EuiPageContentBody)`
  max-width: 400px;
  max-height: 400px;

  & > img {
    width: 100%;
    border-radius: 50%;
  }
`

export default function LandingPage(props) {
  return (
    <StyledEuiPage>
      <EuiPageBody component='section'>
        <EuiFlexGroup>
          <EuiFlexItem grow={2}>
            <StyledEuiPageContent horizontalPosition='center' verticalPosition='center'>
              <StyledEuiPageContentBody></StyledEuiPageContentBody>
            </StyledEuiPageContent>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiPageBody>
    </StyledEuiPage>
  )
}
