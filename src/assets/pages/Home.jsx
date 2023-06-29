import { useState } from "react";
import Product from "../components/Product";
import Button from "../components/Button";

export default function Home() {
  const [products, setProducts] = useState([
    {
      id: 1,
      brand: 'Apple',
      name: "MacBook Air 15”",
      image: "/macbook_air_15.jpg",
      price: 26999999,
    },
    {
      id: 2,
      brand: 'Apple',
      name: "iPhone 14 Pro",
      image: "/iphone_14_pro.jpg",
      price: 19999999,
    },
    {
      id: 3,
      brand: 'Apple',
      name: "iPhone 14",
      image: "/iphone_14.jpg",
      price: 15999999,
    },
    {
      id: 4,
      brand: 'Apple',
      name: "Apple Vision Pro",
      image: "/apple_vision_pro.jpg",
      price: 66999999,
    },
    {
      id: 5,
      brand: 'Apple',
      name: "Apple Watch Series 8",
      image: "apple_watch_series_8.jpg",
      price: 7999999,
    },
    {
      id: 6,
      brand: 'Apple',
      name: "iPad Pro",
      image: "/ipad_pro.jpg",
      price: 15999999,
    }
  ]);
  const [keyword, setKeyword] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(Infinity);
  const [sortBy, setSortBy] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(1);
  const [newProduct, setNewProduct] = useState();
  const [editedProduct, setEditedProduct] = useState();
  const [idSequence, setIdSequence] = useState(products.length);
  const [brandOptions, setBrandOptions] = useState(products.brand);

  const filteredSortedProducts = products
    .toSorted((a, b) => {
      if (sortOrder === "asc") {
        return a[sortBy] < b[sortBy] ? -1 : 1;
      } else {
        return a[sortBy] > b[sortBy] ? -1 : 1;
      }
    })
    .filter(
      (product) =>
        product.name.toLowerCase().includes(keyword) &&
        product.price >= minPrice &&
        product.price <= maxPrice
    );

  return (
    <div className="products">
      <header>
        <button onClick={() => setNewProduct({id: idSequence})}>Tambah</button>
        <label>
          Find:
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </label>
        <section>
          Price:
          <label>
            Minimum:
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </label>
          <label>
            Maximum:
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value || Infinity)}
            />
          </label>
        </section>
        <section>
          Sort:
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="id">Normal</option>
            <option value="name">Name</option>
            <option value="price">Price</option>
          </select>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </section>
      </header>
      <main>
        {filteredSortedProducts.length > 0
          ? filteredSortedProducts
              .filter((_product, i) => i >= 4 * page - 5 && i < 5 * page)
              .map((product) => (
                <Product
                  key={product.id}
                  {...product}
                  setEditedProduct={setEditedProduct}
                />
              ))
          : "Product not found."}
      </main>
      <footer>
        <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Previous
        </Button>
        {filteredSortedProducts
          .filter((_product, i) => i % 5 === 0)
          .map((_product, i) => (
            <button
              key={i}
              className="page-number"
              onClick={() => setPage(i + 1)}
              disabled={i + 1 === page}
            >
              {i + 1}
            </button>
          ))}
        <Button
          onClick={() => setPage(page + 1)}
          disabled={page === Math.ceil(filteredSortedProducts.length / 4)}
        >
          Next
        </Button>
      </footer>
      {editedProduct && (
        <form
          className="dialog"
          onSubmit={(e) => {
            e.preventDefault();
            setProducts(
              products.map((product) =>
                product.id === editedProduct.id ? editedProduct : product
              )
            );
            setEditedProduct(undefined);
          }}
        >
          <h1>Edit Product</h1>
          <label>
            Name
            <input
              type="text"
              value={editedProduct.name}
              onChange={(e) =>
                setEditedProduct({ ...editedProduct, name: e.target.value })
              }
              autoFocus
            />
          </label>
          <label>
            Price
            <input
              type="number"
              value={editedProduct.price}
              onChange={(e) =>
                setEditedProduct({
                  ...editedProduct,
                  price: parseInt(e.target.value),
                })
              }
            />
          </label>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              type="reset"
              variant="tonal"
              onClick={() => setEditedProduct(undefined)}
            >
              Cancel
            </Button>
            <Button>Update</Button>
          </div>
        </form>
      )}
      {newProduct && (
        <form
          className="dialog"
          onSubmit={(e) => {
            e.preventDefault();
            setProducts([...products, newProduct]);
            setNewProduct();
            setIdSequence(idSequence + 1);
          }}
        >
          <h1>Add Product</h1>
          <label>
            Name
            <input
              type="text"
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
              required
              autoFocus
            />
          </label>
          <label>
            Price
            <input
              type="number"
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
              required
            />
          </label>
          <label>
            URL Image
            <input
              type="text"
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
              required
            />
          </label>
          <label>
            Brand
            <select
              value={brandOptions}
              onChange={(e) => setBrandOptions(e.target.value)}
            >
              {products.map((product) => (
                <option key={product.id} value={product.brand}>
                  {product.brand}
                </option>
              ))}
            </select>
          </label>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              type="reset"
              variant="tonal"
              onClick={() => setNewProduct()}
            >
              Cancel
            </Button>
            <Button>Save</Button>
          </div>
        </form>
      )}
    </div>
  );
}
