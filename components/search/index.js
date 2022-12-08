import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter, withRouter } from "next/router";
import { Icon } from "react-icons-kit";
import { Requests } from "../../utils/Http/index";
import { ic_call_made } from "react-icons-kit/md";
import Image from "next/image";
import Search from "../../public/assets/search.svg";

const Index = () => {
  const router = useRouter();
  const wrapperRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const [show, setShow] = useState(false);
  const [query, setQuery] = useState(null);
  const [items, setItems] = useState({ values: null, message: null });

  // fetch Categories
  const fetchCategories = useCallback(async () => {
    try {
      const response = await Requests.Categories.AllCategories();
      if (response.status === 200) {
        console.log(response.data.body.category);
        setCategories(response.data.body.category);
      }
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Out side click
  const useOutsideClick = (ref) => {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setShow(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  };
  useOutsideClick(wrapperRef);

  // Handle search
  const handleSearch = async (event) => {
    const value = event.target.value;
    setQuery(value);
    if (!value) {
      setItems({ values: null, message: null });
      setShow(false);
      setQuery(null);
      return;
    }

    const data = {
      titleText: value,
    };

    const response = await Requests.Products.Search(data);
    console.log(response);
    if (response.status === 200 && response.data.body.product.length) {
      setShow(true);
      setItems({ values: response.data.body.product, message: null });
    } else if (
      response.status === 200 &&
      response.data.body.product.length < 0
    ) {
      setShow(true);
      setItems({ values: null, message: response.message });
    } else {
      setItems({ values: null, message: null });
      setShow(false);
      return;
    }
  };

  // Handle submit
  const handleSubmit = (event) => {
    event.preventDefault();
    if (query) {
      setItems({ values: null, message: null });
      setShow(false);

      let name = query;
      name = name.replace(/ /g, "-");
      location.href = `/product/${name}`;
    }
  };

  return (
    <div className="search-field-container">
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          {/* <select
            className="px-4 border border-primary"
            name="category"
            style={{ cursor: "pointer" }}
          >
            <option value="">All Category</option>
            {categories &&
              categories.length > 0 &&
              categories.map((item, index) => (
                <option value={item.id} key={index} style={{ padding: "5px" }}>
                  {item.name}
                </option>
              ))}
          </select> */}
          <input
            type="text"
            className="form-control shadow-none border border-primary pb-2 pt-2"
            placeholder="Search for..."
            onChange={handleSearch}
            defaultValue={router && router.query ? router.query.query : null}
          />
          <img
            src={Search.src}
            alt=""
            className="my-auto search"
            style={{ position: "relative", left: "-30px" }}
          />
        </div>
      </form>

      {/* Suggested items container */}
      {show ? (
        <div className="suggest-container mb-2" ref={wrapperRef}>
          <div className="shadow border-0">
            {items.values &&
              items.values.length &&
              items.values.map((product, i) => (
                <div
                  onClick={() => router.push(`/product/${product._id}`)}
                  key={i}
                >
                  <div className="item d-flex bg-white">
                    <div className="img-container">
                      <img
                        src={`https://api.efgtailor.com${product.featuredImage.large}`}
                        className="img-fluid"
                        alt="..."
                        height={25}
                        width={25}
                      />
                    </div>
                    <div>
                      <p>{product.name}</p>
                    </div>
                    <div className="ms-auto pt-2 mt-1 me-2">
                      <Icon icon={ic_call_made} size={16} />
                    </div>
                  </div>
                </div>
              ))}

            {items.message ? (
              <div className="message text-center p-4">
                <p>No results found !</p>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default withRouter(Index);
