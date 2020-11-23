import React from 'react'
import { FilterProvider, useFilterContext, useQueryFilter } from './lib'
import './styles.css'


function Content() {

  const [filter, { set, reset }] = useFilterContext<{ keywords: string, type: string }>()

  function handleSubmit() {
    console.log('submit', filter)
  }

  function handleReset() {
    reset(e => console.log('reset', e))
  }

  return (
    <section>
      <h2>useFilterContext</h2>
      <form >
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

      <div>
        <span>{filter.keywords}</span>
        <span>{filter.type}</span>
      </div>
    </section>
  )
}


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
    <FilterProvider value={[filter, { set, reset }]}>
      <section>
        <h2>useQueryFilter</h2>
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

      <Content />

    </FilterProvider>

  )
}

export default App