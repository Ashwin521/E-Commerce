import React, { useEffect, useState } from "react";

const TestApi = () => {
  const [products, setProducts] = useState([]);

  const fetchAmazonProducts = async () => {
    try {
      const response = await fetch(
        "https://real-time-amazon-data.p.rapidapi.com/products-by-category?category_id=281407&sort_by=RELEVANCE&product_condition=ALL&is_prime=false&min_price=1&max_price=200&limit=10&country=US",
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": "real-time-amazon-data.p.rapidapi.com",
            "x-rapidapi-key":
              "2c1b332c26mshe51e47db8a68722p135cbdjsn3a2950583024",
          },
        }
      );

      const result = await response.json();
      setProducts(result.data.products);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchAmazonProducts();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Amazon Products</h1>
      {products.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          {products.map((product) => (
            <div
              key={product.asin}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "10px",
                width: "250px",
              }}
            >
              <img
                src={product.product_photo}
                alt={product.product_title}
                style={{ width: "100%", height: "200px", objectFit: "cover" }}
              />
              <h3 style={{ fontSize: "16px", marginTop: "10px" }}>
                {product.product_title}
              </h3>
              <p>
                ⭐ {product.product_star_rating} ({product.product_num_ratings})
              </p>
              <p>
                <strong>{product.product_price}</strong>{" "}
                <del>{product.product_original_price}</del>
              </p>
              <a
                href={product.product_url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#0070f3", textDecoration: "underline" }}
              >
                View on Amazon
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TestApi;
