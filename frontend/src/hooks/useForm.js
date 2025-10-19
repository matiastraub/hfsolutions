import { useState } from 'react'

export const useForm = (initialValues, onSubmit) => {
  const [formData, setFormData] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await onSubmit(formData)
      setFormData(initialValues)
    } catch (err) {
      setErrors({ submit: err.message })
    } finally {
      setIsSubmitting(false)
    }
  }

  const reset = () => setFormData(initialValues)

  return { formData, handleChange, handleSubmit, reset, errors, isSubmitting }
}
