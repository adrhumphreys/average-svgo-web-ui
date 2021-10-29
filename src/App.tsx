import { useState } from 'react'
import { compress } from './lib/svgo';
import Code from './components/Code';
import { svg } from './test';
import Preview from './components/Preview';

function App() {
  const [count, setCount] = useState(0)

  const code = svg();
  const comp = compress(code, { plugins: [] });
  console.log(comp)

  return (
    <div className="App">
      <Preview html={code} />
      <Preview html={comp.data} />
      <Code source={code} />
      <Code source={comp.data} />

      <div>

      </div>
    </div>
  )
}

export default App
