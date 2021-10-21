function currencyConverter(value){
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value)
}

module.exports = currencyConverter 