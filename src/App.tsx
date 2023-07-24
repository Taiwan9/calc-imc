import { useState } from 'react';
import style from './App.module.css';
import poweredImage from './assets/powered.png';
import { levels, calcualteImc, Level } from './helpers/imc';
import leftArrowImage from "./assets/leftarrow.png"
import { GridItem } from './components/GridItem';

const App = ()=>{
  const [heightField, setHeightField] = useState<number>(0);
  const [weightField, setWeightField] = useState<number>(0);
  const [toShow, setToShow] = useState<Level | null>(null);

  const handleCalcularButton = () => {
    if(heightField && weightField){
      setToShow(calcualteImc(heightField, weightField));

    }else{
      alert('Digite Todos os Campos')
    }
  }

  const handleBackButton = () =>{
    setToShow(null);
    setHeightField(0);
    setWeightField(0);
  }
  return(
    <div className={style.main}>
      <header>
        <div className={style.headerContainer}>
          <img src={poweredImage} alt='Logo do app' width={150}/>
        </div>
      </header>

      <div className={style.container}>
        <div className={style.leftSide}>
          <h1>Calcule seu IMC</h1>
          <p>IMC é a sigla para Índice de Massa Corpórea, parâmetro adotado pela 
            organização Mundial da Saúde
            para calcular o peso ideal de cada pessoa.
          </p>

          <input
            type='number'
            placeholder='Digite sua altura. Ex.:1.5(em metros)'
            value={heightField > 0 ? heightField:''}
            onChange={ e => setHeightField(parseFloat(e.target.value))}
            disabled={toShow ? true : false}
          />

          <input
            type='number'
            placeholder='Digite seu peso. Ex.:65.0(em Kilograma)'
            value={weightField > 0 ? weightField:''}
            onChange={ e => setWeightField(parseFloat(e.target.value))}
            disabled={toShow ? true : false}
          />

          <button onClick={handleCalcularButton} disabled={toShow ? true : false}>Calcular</button>
        </div>
        <div className={style.rightSide}>
          {!toShow &&
            <div className={style.grid}>
              {levels.map((item, key)=>(
                <GridItem key={key} item={item}/>
              ))}
            </div>
          }
          {toShow &&
            <div className={style.rightBig}>
              <div className={style.rightArrow} onClick={handleBackButton}>
                <img  src={leftArrowImage} alt="" width={25}/>
              </div>
              <GridItem item={toShow}/>
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default App;