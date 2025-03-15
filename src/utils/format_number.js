const format_number = (number) => {
  return(new Intl.NumberFormat("en-US", {style: "currency", currency: "USD", minimumFractionDigits: 2}).format(number))
}

export default format_number;