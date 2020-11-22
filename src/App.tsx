import React, { useEffect } from 'react'
import './styles.css'
import { FormContext, useFormContext, useForm } from 'useforms'
import * as yup from 'yup'

type Form = {
  name: string,
  date: Date,
  other: {
    test: string,
    anything: {
      test: number
    }
  },
  score?: number,
}

const initialValues = {
  name: 'Joseph',
  email: '',
  password: '',
  date: new Date(),
  score: 2,
  other: {
    test: 'juciano'
  },
  country:'USA',
  accept:true,
  option: 'value 2'
}

function Form2() {

  const { register, state, setFieldValue } = useFormContext<typeof initialValues>()

  return (
    <>
    <h3>I'm another component</h3>
      <div>
        <input placeholder="Last Name" {...register('lastName')} />Brazil
        <span className="error">{state.touched?.name && state.errors?.name}</span>
      </div>

      <div {...register('country')}>
        <input type="radio" value="BRASIL" name="country"/>
        <input type="radio" value="USA" name="country"/>
        <input type="radio" value="CHILE" name="country" />
      </div>

      <div>
        <input type="checkbox" {...register('accept')}/>
      </div>

      <div>
        <button onClick={()=>setFieldValue('accept', false)}>set Accept</button>
      </div>

      <div>
        <select {...register('option')}>
          <option value="value 1">1</option>
          <option value="value 2">2</option>
          <option value="value 3">3</option>
          <option value="value 4">4</option>
        </select>
      </div>
    </>
  )
}


const schemaValidation = yup.object().shape({
  name: yup.string().required("this field is required"),
  email: yup.string().required("this field is required").email("this field must be a valid email"),
  password: yup.string().required('this field is required'),
  date: yup.date(),
  other: yup.object().shape({
    test: yup.string()
  })
});

const App: React.FC = () => {

  const { register, state, resetForm, setForm, setFieldsTouched, resetFieldsTouched, onSubmit, setFieldsValue, ...form } = useForm<Form>({
    initialValues,
    schemaValidation,
    isControlled: true,
    //debounced: 500
  })


  function handleSetForm() {
    setForm(state => ({
      ...state,
      values: {
        ...state.values,
        name: 'Juciano',
        email: 'jose@jose.com'
      }
    }))
  }


  function handlesetFieldsTouched() {
    setFieldsTouched(state => ({ ...state, name: false, other: { test: true } }))
    form.setFieldsError(state => ({ ...state, name: 'error' }))
  }

  function handleSubmit(e: typeof initialValues, isValid) {
    console.log(e, isValid)
  }

  useEffect(() => {
  //  console.log(state.values)
  }, [state])

  return (
    <FormContext.Provider value={{ register, state, resetForm, setForm, setFieldsTouched, resetFieldsTouched, onSubmit, setFieldsValue, ...form }}>
      <section>
        <form >
          <div>
            <input placeholder="Name" {...register('name')} />
            <span className="error">{state.touched?.name && state.errors?.name}</span>
          </div>
          <div>
            <input placeholder="E-mail" {...register('email')} />
            <span className="error">{state.touched?.email && state.errors?.email}</span>
          </div>
          <div>
            <input placeholder="Password" {...register('password')} />
            <span className="error">{state.touched?.password && state.errors?.password}</span>
          </div>
          <div>
            <input placeholder="Score" type="range" {...register('score')} />
            <span className="error">{state.touched?.score && state.errors?.score}</span>
          </div>
          <div>
            <input placeholder="Date" type="date" {...register('date')} />
            <span className="error">{state.touched?.date && state.errors?.date}</span>
          </div>
          <div>
            <input placeholder="File" type="file" {...register('file')} />
            <span className="error">{state.touched?.file && state.errors?.file}</span>
          </div>
          <div>
            <button type="button" onClick={resetForm}>resetForm</button>
            <button type="button" onClick={handleSetForm}>setForm</button>
            <button type="button" onClick={handlesetFieldsTouched}>setFieldsTouched</button>
            <button type="button" onClick={resetFieldsTouched}>resetFieldsTouched</button>
            <button type="button" onClick={onSubmit(handleSubmit)}>submit</button>
          </div>
          <Form2 />
        </form>
      </section>
    </FormContext.Provider>
  )
}

export default App