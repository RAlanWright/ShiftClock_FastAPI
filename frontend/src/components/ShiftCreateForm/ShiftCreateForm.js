import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Actions as shiftActions } from '../../redux/shifts'
import { useNavigate } from 'react-router'
import {
  EuiButton,
  EuiDatePicker,
  EuiFieldText,
  EuiForm,
  EuiFormRow,
  EuiFieldNumber,
  EuiSuperSelect,
  EuiSpacer,
  EuiText,
  EuiTextArea
} from '@elastic/eui'
import validation from '../../utils/validation'
import { extractErrorMessages } from '../../utils/errors'
import moment from 'moment'


function ShiftCreateForm({ user, shiftError, isLoading, createShift }) {
  const [form, setForm] = React.useState({
    name: '',
    date: '',
    start_time: '',
    end_time: ''
  })

  const DatePicker = () => {
    const [date, setDate] = useState(moment())
    const [start_time, setStartTime] = useState(moment())
    const [end_time, setEndTime] = useState(moment())

    const handleDate = event => {
      setDate(event.target.value)
    }

    const handleStartTime = event => {
      setStartTime(event.target.value)
    }

    const handleEndTime = event => {
      setEndTime(event.target.value)
    }

    return (
      <div>
        <EuiFormRow label='Date'>
          <EuiDatePicker
            selected={date}
            onChange={handleDate}
          />
        </EuiFormRow>

        <EuiSpacer />

        <EuiFormRow label='Start'>
          <EuiDatePicker
            showTimeSelect
            showTimeSelectOnly
            selected={start_time}
            onChange={handleStartTime}
            dateFormat='HH:mm'
            timeFormat='HH:mm'
          />
        </EuiFormRow>

        <EuiSpacer />

        <EuiFormRow label='End'>
          <EuiDatePicker
            showTimeSelect
            showTimeSelectOnly
            selected={end_time}
            onChange={handleEndTime}
            dateFormat='hh:mm a'
            timeFormat='hh:mm a'
          />
        </EuiFormRow>
      </div>
    )
  }

  const [errors, setErrors] = React.useState({})
  const [hasSubmitted, setHasSubmitted] = React.useState(false)
  const navigate = useNavigate()
  const shiftErrorList = extractErrorMessages(shiftError)

  const validateInput = (label, value) => {
    // Grab validation function and run it on input if it exists
    // If it doesn't exists, just assume the input is valid
    const isValid = validation?.[label] ? validation?.[label]?.(value) : true
    // Set an error if the validation function did NOT return true
    setErrors((errors) => ({ ...errors, [label]: !isValid }))
  }

  const onInputChange = (label, value) => {
    validateInput(label, value)

    setForm((state) => ({ ...state, [label]: value }))
  }


  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate inputs before submitting
    Object.keys(form).forEach((label) => validateInput(label, form[label]))

    // If any input hasn't been entered in, return early
    if (!Object.values(form).every((value) => Boolean(value))) {
      setErrors((errors) => ({ ...errors, form: `You must fill out all fields.` }))
      return
    }

    setHasSubmitted(true)

    const res = await createShift({ new_shift: { ...form } })
    if (res.success) {
      const shiftId = res.data?.id
      navigate(`/shifts/${shiftId}`)
      // Redirect user to the new shift
    }
  }

  const getFormErrors = () => {
    const formErrors = []

    if (errors.form) {
      formErrors.push(errors.form)
    }

    if (hasSubmitted && shiftErrorList.length) {
      return formErrors.concat(shiftErrorList)
    }

    return formErrors
  }

  return (
    <>
      <EuiForm
        component='form'
        onSubmit={handleSubmit}
        isInvalid={Boolean(getFormErrors().length)}
        error={getFormErrors()}
      >
        <EuiFormRow
          label='Name'
          helpText='Employee Name'
          isInvalid={Boolean(errors.name)}
          error={`Please enter a valid name.`}
        >
          <EuiFieldText
            name='name'
            value={form.name}
            onChange={(e) => onInputChange(e.target.name, e.target.value)}
          />
        </EuiFormRow>

        <EuiFormRow
          label=' Date'
          helpText=''
          isInvalid={Boolean(errors.date)}
          error={`Please enter a valid input.`}
        >
          <EuiTextArea
            name='date'
            placeholder='Date'
            value={form.date}
            onChange={(e) => onInputChange(e.target.name, e.target.value)}
          />
        </EuiFormRow>

        <EuiSpacer />

        <EuiButton type='submit' isLoading={isLoading} fill>
          Create Shift
        </EuiButton>
      </EuiForm>
    </>
  )
}

export default connect(
  (state) => ({
    user: state.auth.user,
    isLoading: state.shifts.isLoading,
    shiftError: state.shifts.error
  }),
  {
    createShift: shiftActions.createShift
  }
)(ShiftCreateForm)
