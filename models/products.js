class Product {
  constructor(
    id,
    ownerId,
    title,
    imageUrl,
    description,
    price
  ) {
    this.id = id;
    this.ownerId = ownerId;
    this.imageUrl = imageUrl;
    this.description = description;
    this.title = title;
    this.price = price;
  }
}

export default Product
