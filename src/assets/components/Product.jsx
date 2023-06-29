import Button from "./Button";

export default function Product({
  id,
  brand,
  name,
  image,
  price,
  setEditedProduct,
}) {
  return (
    <div className="product">
      <img src={image} alt={name} />
      <section>
        <h2>{name}</h2>
        <p>
          {price.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0,
          })}
        </p>
        <div>
          <Button
            variant="tonal"
            onClick={() =>
              setEditedProduct({
                id,
                brand,
                name,
                image,
                price,
              })
            }
          >
            Edit
          </Button>
          <Button>Buy</Button>
        </div>
      </section>
    </div>
  );
}
