import React from "react";
import _pt from "prop-types";
import { DEFAULT_CURRENCY, MICROS } from "../../constants";
import formatPrice from "../../utils/formatPrice";
import Empty from "../Empty";
import Core from "../../../src";

const Price = ({
  amount: baseAmount,
  currency: baseCurrency,
  micros: baseMicros,
  display,
  locale,
  precision,
  round,
  trimTrailingZeros
}) => {
  let amount = 0;
  let currency = baseCurrency;
  let micros = baseMicros;

  if (baseAmount === undefined || baseAmount === null) {
    return <Empty />;
  }

  if (typeof baseAmount === "object") {
    currency = baseAmount.currency; // eslint-disable-line prefer-destructuring
    micros = baseAmount.is_micros_accuracy;
    amount = micros ? baseAmount.amount_micros : baseAmount.amount;
  } else if (typeof baseAmount === "number") {
    amount = baseAmount;
  }

  if (micros) {
    amount /= MICROS;
  }

  return (
    <span>
      {formatPrice(amount, currency, {
        display,
        precision,
        round,
        trimTrailingZeros,
        locale: locale || Core.locale()
      })}
    </span>
  );
};

Price.propTypes = {
  currency: _pt.any,
  trimTrailingZeros: _pt.bool,
  round: _pt.bool,
  precision: _pt.number,
  micros: _pt.bool,
  locale: _pt.any,
  amount: _pt.oneOfType([_pt.object, _pt.number]),
  display: _pt.oneOf(["symbol", "code", "name"])
};

Price.defaultProps = {
  amount: null,
  currency: DEFAULT_CURRENCY,
  display: "symbol",
  locale: undefined,
  micros: false,
  precision: 0,
  round: false,
  trimTrailingZeros: false
};

export default Price;
