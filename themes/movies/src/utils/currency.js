import currency from 'currency.js'

export function vnd(price){
    return currency(price, { symbol: 'đ', decimal: ',', separator: '.', negativePattern:"# !", pattern:"# !", precision:0 }).format()
}

export function usd(price) {
    return currency(price).format()
}