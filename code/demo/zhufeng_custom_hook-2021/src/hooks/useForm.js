import {useState} from 'react'
function useForm(initialValues){
  const [formData, setFormData] = useState(initialValues)
  const setFormValue = (key, value) =>{
    setFormData({...fromData, [key]:value})
  }

  const resetForm = () => {
    this.setFormData(initialValues)
  }

  return [formData, setFormValue, resetForm]
}

export default useForm