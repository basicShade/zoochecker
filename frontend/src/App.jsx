import {BrowserRouter, Routes, Route } from 'react-router-dom'
import { ReceiptCreate, ReceiptEdit, ReceiptList } from './pages'

function App() {


  return(
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<ReceiptCreate/>} />
        <Route exact path='/receipts/:id' element={<ReceiptEdit/>} />
        <Route exact path='/receipts/' element={<ReceiptList/>} />
      </Routes>
    </BrowserRouter> 
 



  )
}

export default App
