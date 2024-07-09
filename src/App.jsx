import { useEffect, useState } from 'react'
import './App.css'

import currencyImg from "./assets/currencyConverter.png";
import axios from 'axios';

function App() {

  const [amt,setAmt] = useState(1);
  const [fromCurr,setFromCurr] = useState("USD");
  const [toCurr,setToCurr] = useState("INR");
  const [exchangeAmt,setExchangeAmt] = useState();
  const [convertedAmt,setConvertedAmt] = useState();

  useEffect(()=>{
    const getExchangeAmount= async ()=>{
      try{
        let url = `https://api.exchangerate-api.com/v4/latest/${fromCurr}`;
      const res = await axios.get(url);
      
      setExchangeAmt(res.data.rates[toCurr]);

      }catch(err){
        console.log("Error occurred while converting the currency : "+err)
      }
    }
    getExchangeAmount();
  },[fromCurr,toCurr])

  useEffect(()=>{
    setConvertedAmt((amt*exchangeAmt).toFixed(2));
  },[amt,exchangeAmt])
  
  const getAmout =(e)=>{
    const value = parseFloat(e.target.value);
    setAmt(isNaN(value)?0:value);
  }

  return (
    <>
      <div className="container">
        <div className="img-div">
          <img src={currencyImg} alt="Currency Converter" className='img'/>
        </div>
        <div className="title">
          <h3>Currency Converter</h3>
        </div>
          <div className="input-container">
          <div className="input-div">
            <label htmlFor="amount">Amount:</label>
            <input type="number" id='amount' value={amt} onChange={getAmout}/>
          </div>
          <div className="input-div">
            <label htmlFor="frCurrency">From Currency:</label>
            <select name="fromCurr" id="frCurrency" className='frCurrency' value={fromCurr} onChange={(e)=>setFromCurr(e.target.value)}>
              <option value="0">Select Currency</option>
              <option value="USD">USD - United State Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound Sterlig</option>
              <option value="JPY">JPY - Japanese Yen</option>
              <option value="AUD">AUD - Australian Dollar</option>
              <option value="CAD">CAD - Canadian Dollar</option>
              <option value="CNY">CNY - Chinese Yuan</option>
              <option value="INR">INR - Indian Ruppee</option>
              <option value="BRL">BAR - Brazilian Real</option>
              <option value="ZAR">ZAR - South African Rand</option>
            </select>
          </div>
          <div className="input-div">
            <label htmlFor="toCurrency">To Currency:</label>
            <select name="toCurr" id="toCurrency" className='toCurrency' value={toCurr} onChange={(e)=>setToCurr(e.target.value)}>
              <option value="0">Select Currency</option>
              <option value="USD">USD - United State Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound Sterlig</option>
              <option value="JPY">JPY - Japanese Yen</option>
              <option value="AUD">AUD - Australian Dollar</option>
              <option value="CAD">CAD - Canadian Dollar</option>
              <option value="CNY">CNY - Chinese Yuan</option>
              <option value="INR">INR - Indian Ruppee</option>
              <option value="BRL">BAR - Brazilian Real</option>
              <option value="ZAR">ZAR - South African Rand</option>
            </select>
          </div>
        </div>
        <div className="res">
          <p>{amt} {fromCurr} is equal to {convertedAmt} {toCurr}</p>
        </div>
        <div className='footer'>
          <p>Designed by <span>Suguna Priya</span></p>
        </div>
      </div>
    </>
  )
}

export default App
