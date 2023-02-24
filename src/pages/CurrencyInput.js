import React from "react";
import PropTypes from "prop-types";
//state : 기본값 false
const CurrencyInput = ({
  amount,
  currencies,
  currency,
  onAmountChange,
  onCurrencyChange,
  state,
}) => {
  console.log(typeof amount);
  return (
    <div className="CurrencyInput">
      <select
        value={currency}
        // 첫번째 => from / 두번쨰 to
        name={state ? "to" : "from"}
        onChange={(e) => onCurrencyChange(e.target)}
      >
        {currencies.map((content, idx) => {
          return (
            <option key={idx} value={content}>
              {content}
            </option>
          );
        })}
      </select>
      <input
        type="text"
        // 기본값이 fal / true면 to / false면 from
        name={state ? "from" : "to"}
        value={amount}
        onChange={(e) => onAmountChange(e.target)}
      />
    </div>
  );
};

// PropTypes => 들어오는 prop의 타입을 지정해줌
CurrencyInput.propTypes = {
  amount: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  currencies: PropTypes.array,
  onCurrencyChange: PropTypes.func,
  onAmountChange: PropTypes.func,
};

export default CurrencyInput;
