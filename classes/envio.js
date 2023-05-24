// Clase que genera cada nueva cotización
class Shipping {
  constructor(
    documentClient,
    nameClient,
    lastNameClient,
    emailClient,
    phoneClient,
    shippingNumber,
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
    priceShipping
  ) {
    this.documentClient = documentClient;
    this.nameClient = nameClient.toUpperCase();
    this.lastNameClient = lastNameClient.toUpperCase();
    this.emailClient = emailClient.toLowerCase();
    this.phoneClient = phoneClient;
    this.shippingNumber = shippingNumber;
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
    this.priceShipping = priceShipping;
  }
  toString() {
    return this.shippingNumber();
  }
}
