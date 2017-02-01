
import React from 'react'
import { Form } from 'lightning-forms'
import { CurrencyInput, Head, Input, Page } from '../common'

export const Pay = () => {
  const fields = [
    {
      name: 'address',
      placeholder: 'Lightning URL / Bitcoin Address',
      required: true,
      component: Input,
    },
    {
      name: 'amount',
      placeholder: 'Amount',
      required: true,
      component: CurrencyInput,
    },
  ]

  const handleSuccess = ({ address, amount }) => {
    console.log('success', address, amount)
  }

  const handleError = (errors) => {
    console.log('error', errors)
  }

  return (
    <Page>
      <Head
        title="Make a Payment"
        body="To send funds, enter a Lightning payment URL or a Bitcoin address.
        Lightning payments will be instant, on-chain Bitcoin transactions
        require blockchain confirmation (approximately 10 minutes)."
      />
      <Form
        name="pay"
        fields={ fields }
        submitLabel="Send Payment"
        clearLabel="Cancel"
        onSuccess={ handleSuccess }
        onError={ handleError }
      />
    </Page>
  )
}

export default Pay
