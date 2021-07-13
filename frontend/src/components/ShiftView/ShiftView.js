import React from 'react'
import { connect } from 'react-redux'
import { Actions as shiftActions } from '../../redux/shifts'
import {
  EuiAvatar,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiLoadingSpinner,
  EuiTitle
} from '@elastic/eui'
import { ShiftCard, NotFoundPage } from '../../components'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

const StyledEuiPage = styled(EuiPage)`
  flex: 1;
`
const StyledFlexGroup = styled(EuiFlexGroup)`
  padding: 1rem;
`

function ShiftView({
                     isLoading,
                     shiftError,
                     currentShift,
                     fetchShiftById,
                     clearCurrentShift
                   }) {
  const { shift_id } = useParams()

  React.useEffect(() => {
    if (shift_id) {
      fetchShiftById({ shift_id })
    }

    return () => clearCurrentShift()
  }, [shift_id, fetchShiftById, clearCurrentShift])

  if (isLoading) return <EuiLoadingSpinner size='xl' />
  if (!currentShift) return <EuiLoadingSpinner size='xl' />
  if (!currentShift?.name) return <NotFoundPage />

  return (
    <StyledEuiPage>
      <EuiPageBody component='section'>
        <EuiPageContent verticalPosition='center' horizontalPosition='center' paddingSize='none'>
          <StyledFlexGroup justifyContent='flex-start' alignItems='center'>
            <EuiFlexItem grow={false}>
              <EuiAvatar
                size='xl'
                name={
                  currentShift.owner?.profile?.full_name ||
                  currentShift.owner?.username ||
                  'Anonymous'
                }
                initialsLength={2}
                imageUrl={currentShift.owner?.profile?.image}
              />
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiTitle>
                <p>@{currentShift.owner?.username}</p>
              </EuiTitle>
            </EuiFlexItem>
          </StyledFlexGroup>

          <EuiPageContentBody>
            <ShiftCard shift={currentShift} />
          </EuiPageContentBody>
        </EuiPageContent>
      </EuiPageBody>
    </StyledEuiPage>
  )
}

export default connect(
  (state) => ({
    isLoading: state.shifts.isLoading,
    shiftError: state.shifts.shiftsError,
    currentShift: state.shifts.currentShift
  }),
  {
    fetchShiftById: shiftActions.fetchShiftById,
    clearCurrentShift: shiftActions.clearCurrentShift
  }
)(ShiftView)
