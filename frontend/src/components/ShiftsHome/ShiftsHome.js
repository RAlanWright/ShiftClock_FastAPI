import React from 'react'
import { connect } from 'react-redux'
import {
  // EuiAvatar,
  // EuiHorizontalRule,
  // EuiIcon,
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiTitle
  // EuiText,
} from '@elastic/eui'
import { ShiftCreateForm } from '../../components'
import styled from 'styled-components'

const StyledEuiPage = styled(EuiPage)`
  flex: 1;
`
const StyledEuiPageHeader = styled(EuiPageHeader)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem;

  & h1 {
    font-size: 3.5rem;
  }
`

function ShiftsHome({ user }) {
  return (
    <StyledEuiPage>
      <EuiPageBody component='section'>
        <StyledEuiPageHeader>
          <EuiPageHeaderSection>
            <EuiTitle size='l'>
              <h1>Shifts</h1>
            </EuiTitle>
          </EuiPageHeaderSection>
        </StyledEuiPageHeader>
        <EuiPageContent verticalPosition='center' horizontalPosition='center'>
          <EuiPageContentBody>
            <>
              <ShiftCreateForm />
            </>
          </EuiPageContentBody>
        </EuiPageContent>
      </EuiPageBody>
    </StyledEuiPage>
  )
}

export default connect((state) => ({ user: state.auth.user }))(ShiftsHome)
