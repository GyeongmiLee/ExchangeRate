import React, { useEffect, useState } from "react";
import CurrencyInput from "./CurrencyInput";
import axios from "axios";
/* 받아오는 데이터의 정보 
    - base_code : 여기서 정해진 나라 기준으로 계산(USD가 기본(1))
    - conversion_rates: 나라별 바꿔주는 비율
*/

//baseurl+key
const URL = `https://v6.exchangerate-api.com/v6/c1d6370233e337a9f2404e63/latest/USD`;
const CurrencySection = () => {
  //처음 mount 될때 데이터 불러와야하므로 useEffect사용
  useEffect(() => {
    DataHandler();
  }, []);

  const [amount, setAmount] = useState({
    from: 0,
    to: 0,
  });

  const [currency, setCurrency] = useState({
    from: "USD",
    to: "KRW",
  });
  const [rates, setRates] = useState([]);
  const [state, setState] = useState(false);
  const DataHandler = async () => {
    // 동기방식으로 데이터 받아옴
    await axios.get(`${URL}`).then((res) => {
      setRates(res.data.conversion_rates);
    });
    // console.log(data);
    // 77번째 : 한국(KRW)
    // const KrwCurrency = Object.keys(data.conversion_rates)[77];
  };
  const handleCurrencyChange = (e) => {
    //해결 못한 부분 : currency바뀔때 => amount 바뀌는 부분!
    // e = e.target
    // e.name = input의 currency이름
    console.log(amount);
    //만약 from을 바꿔야하면
    if (e.name === "from") {
      //from currency를 누르면 to가 바뀌어야함
      setCurrency({
        ...currency,
        [e.name]: e.value,
      });
    } else if (e.name === "to") {
      console.log("d");

      setCurrency({
        ...currency,
        [e.name]: e.value,
      });
    }
  };

  const handleAmountChange = (e) => {
    //e = e.target
    // console.log(currency);
    // console.log(typeof e.value);
    if (e.name === "from") {
      // from에 입력하면 to가 바뀜
      // 데이터를 바꾸기 위해서는 항상 setState 이용해야함
      setAmount({
        [e.name]: (
          (e.value * rates[currency.from]) /
          rates[currency.to]
        ).toFixed(2),
      });
    } else if (e.name === "to") {
      // type을 text로 지정해줘야함, numberformat 정의하려면!
      setAmount({
        [e.name]: new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: `${currency.to}`,
        }).format((e.value * rates[currency.to]) / rates[currency.from]),
      });
    }

    // 해결 못한 부분 : 필터 바뀌면 => 적용되어야함!! 이것만 적용하고 css 마무리 하면 될듯

    // else if (e.name === "to") {
    //   setAmount({
    //     [e.name]: (
    //       (e.value * rates[currency.to]) /
    //       rates[currency.from]
    //     ).toFixed(2),
    //   });
    // }
  };
  return (
    <div>
      {/* CurrencyInput에서 받아야하는 props = fromAmount(입력값),   */}
      {/* fromAmount amountOnchange select selectOnchange 나라이름 */}
      <CurrencyInput
        amount={amount.from}
        // key호출할때는 Object.keys(데이터) => 배열로 꺼내와줌
        currencies={Object.keys(rates)}
        currency={currency.from}
        onAmountChange={handleAmountChange}
        onCurrencyChange={handleCurrencyChange}
        // false
        state={state}
      />
      {/* <button>swap!</button> 버튼섹션, swap누르면 바뀌고 / 1fromcurrency = 몇 비율인지 계산*/}
      <CurrencyInput
        amount={amount.to}
        currencies={Object.keys(rates)}
        currency={currency.to}
        onAmountChange={handleAmountChange}
        onCurrencyChange={handleCurrencyChange}
        // true
        state={!state}
      />
    </div>
  );
};

export default CurrencySection;
