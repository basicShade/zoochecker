import {BrowserRouter, Routes, Route } from 'react-router-dom'
import { ReceiptCreate, ReceiptEdit } from './pages'

function App() {


  return(
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<ReceiptCreate/>} />
        <Route exact path='/receipts/:id' element={<ReceiptEdit/>} />

      </Routes>
    </BrowserRouter> 
 



  )
}

export default App
