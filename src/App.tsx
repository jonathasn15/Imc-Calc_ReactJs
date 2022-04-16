import React, { useState } from 'react';
import styles from './App.module.css'
import poweredImage from './assets/powered.png';
import {levels, calculateImc, level} from './helpers/imc';
import { GridItem } from './components/GridItem';
import leftArrowImage from './assets/leftarrow.png';

const App = () => {

const [higthField, sethigthField] = useState<number>(0);
const [weigthField, setweigthField] = useState<number>(0);
const [toShow, setToShow] = useState<level| null>(null);

const handleCalculeteButton = () =>{
  if(higthField && weigthField ){
    setToShow(calculateImc(higthField,weigthField));
  }else{
    alert("Digite todos os campos!")
  }
}

const handleBackButton = () =>{
  setToShow(null);
  sethigthField(0);
  setweigthField(0);

}
  return(
 <div className={styles.main}>
   <header>
     <div className={styles.headerContainer}>
       <img src={poweredImage} alt="" width={150} />
     </div>
   </header>
   <div className={styles.container}>

      <div className={styles.leftSide}>
        <h1>Calcule o seu IMC.</h1>
        <p>IMC é a sigla para o índice de Massa Carpórea, 
          parâmetro adotado pela Organização Mundial de Saúde para calcular 
          o peso ideal de cada pessoa.
        </p>
        <input 
        type="number"
        placeholder="Digite sua altura ex: 1.75 (em métros)" 
        value={higthField > 0 ? higthField : ''} 
        onChange={e => sethigthField(parseFloat(e.target.value))}
        disabled={toShow ? true : false}
         />
         <input 
        type="number"
        placeholder="Digite seu peso ex: 75.3 (em kg)" 
        value={weigthField > 0 ? weigthField : ''} 
        onChange={e => setweigthField(parseFloat(e.target.value))}
        disabled={toShow ? true : false}
         />

         <button onClick={handleCalculeteButton}
          disabled={toShow ? true : false}>Calcular</button>
      </div>
      <div className={styles.rightSide}>
        {!toShow &&
        <div className={styles.grid}>
          {levels.map((item,key)=>(
            <GridItem key={key} item={item}/>
          ))}
        </div>}
        {toShow &&
        <div className={styles.gridBig}>
          <div className={styles.rightArrow} onClick={handleBackButton}>
            <img src={leftArrowImage} alt="" width={25} />
          </div>
          <GridItem item={toShow} />
        </div>}
     
      </div>

   </div>
   
 </div>
  )
}

export default App;
