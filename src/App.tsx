import React from 'react'
import { useQueryFilter } from './lib'
import './styles.css'


const App: React.FC = () => {

  const [filter, { set, reset }] = useQueryFilter({
    keywords: '',
    type: 'JSX'
  })

  function handleSubmit() {
    console.log('submit', filter)
  }

  function handleReset() {
    reset(e => console.log('reset', e))
  }


  return (
    <section>
      <form >
        <div>
          <input placeholder="Keywords" onChange={e => set({ keywords: e.target.value })} value={filter.keywords} />
        </div>
        <div>
          <select placeholder="Type" onChange={e => set({ type: e.target.value })} value={filter.type}>
            <option value="JSX">JSX</option>
            <option value="TSX">TSX</option>
            <option value="JS">JS</option>
          </select>
        </div>
        <div>
          <button type="button" onClick={handleReset}>Reset</button>
          <button type="button" onClick={handleSubmit}>Submit</button>
        </div>
      </form>
    </section>

  )
}

export default App