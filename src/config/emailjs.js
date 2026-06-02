const WEB3FORMS_ACCESS_KEY = '1c7235b4-ce17-48f3-b0ad-8f0b01d58a3a'

export const sendContactForm = async formElement => {
  const name = formElement.elements.from_name?.value?.trim() || ''
  const email = formElement.elements.from_email?.value?.trim() || ''
  const subject = formElement.elements.subject?.value?.trim() || ''
  const message = formElement.elements.message?.value?.trim() || ''

  const formData = new FormData()

  formData.append('access_key', WEB3FORMS_ACCESS_KEY)
  formData.append('subject', `Portfolio Contact - ${subject || name}`)
  formData.append('from_name', 'Amine Neji Portfolio')
  formData.append('replyto', email)

  formData.append('Name', name)
  formData.append('Email', email)
  formData.append('Subject', subject || 'No subject')
  formData.append('Message', message)

  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    body: formData,
  })

  const data = await response.json()

  if (!response.ok || !data.success) {
    const error = new Error(data.message || 'Form submission failed')
    error.status = response.status
    throw error
  }

  return data
}