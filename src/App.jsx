import { use, useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import ImageGrid from "./components/ImageGrid";

function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("nature");
  const [page, setPage] = useState(1);

  const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY;
  const PEXELS_API_URL = "https://api.pexels.com/v1/search";

  const fetchImages = async (searchQuery = "nature", pageNum = 1) => {
    if (!PEXELS_API_KEY) {
      setError("API key is missing. Please set your Pexels API key.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${PEXELS_API_URL}?query=${encodeURIComponent(
          searchQuery
        )}&per_page=20&page=${pageNum}`,
        {
          headers: {
            Authorization: PEXELS_API_KEY,
          },
        }
      );
      console.log("Fetch response:", response);

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Fetched data:", data);

      if (pageNum === 1) {
        setImages(data.photos || []);
        setPage(1);
      } else {
        setImages((prevImages) => [...prevImages, ...(data.photos || [])]);
        setPage(pageNum);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message || "An err-g images.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages(query);
  }, []);

  const handleSearch = (searchTerm) => {
    setQuery(searchTerm);
    fetchImages(searchTerm, 1);
  };

  const handleLoadMore = () => {
    fetchImages(query, page + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-2">
          Image Search App
        </h1>
        <p className="text-center text-gray-600 mb-8">Powered by Pexels API</p>
        <SearchBar onSearch={handleSearch} />

        {error && (
          <div>
            <p className="text-red-500 text-center mb-4">{error}</p>
          </div>
        )}
        <ImageGrid images={images} loading={loading} />
        {images.length > 0 && !loading && (
          <div className="text-center">
            <button
              onClick={handleLoadMore}
              className="mt-6 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              Load More Images
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
