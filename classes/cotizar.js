// Clase que genera cada nueva cotización
class Quote {
  constructor(
    quoteNumber,
    originCity,
    originStreet,
    originStreetNumber,
    originPostalCode,
    destinationCity,
    destinationStreet,
    destinationStreetNumber,
    destinationPostalCode,
    nameProduct,
    weightProduct,
    heightProduct,
    widthProduct,
    productPrice,
    priceQuote
  ) {
    this.quoteNumber = quoteNumber;
    this.originCity = originCity;
    this.originStreet = originStreet;
    this.originStreetNumber = originStreetNumber;
    this.originPostalCode = originPostalCode;
    this.destinationCity = destinationCity;
    this.destinationStreet = destinationStreet;
    this.destinationStreetNumber = destinationStreetNumber;
    this.destinationPostalCode = destinationPostalCode;
    this.nameProduct = nameProduct.toUpperCase();
    this.weightProduct = weightProduct;
    this.heightProduct = heightProduct;
    this.widthProduct = widthProduct;
    this.productPrice = productPrice;
    this.priceQuote = priceQuote;
  }
  toString() {
    return this.quoteNumber();
  }
}
