import { useEffect, useState } from "react";
import { ImageList } from "./components/ImageList/ImageList";
import s from "./App.module.css";
import { useScrollPositon } from "./hooks/useScrollPositon";
import axios from "axios";

// Store the page number to fetch
// Create a function request to fetch 5 others images (using the page to fetch)
// Add the new images in imageList
// Listen to pageToFetch updates and request new images, when it changes
// Create a function to increase the page to fetch number
// Increase the page number when reaching the bottom of the screen
// Display a spinner while a request is loading

export function App() {
  const [imageList, setImageList] = useState([]);
  const { isBottom } = useScrollPositon();
  const [pageToFetch, setPageToFetch] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchImagesByPage(pageNumber) {
    setIsLoading(true);
    const { data } = await axios(
      `https://picsum.photos/v2/list?page=${pageNumber}&limit=5`
    );

    setImageList([...imageList, ...data]);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchImagesByPage(pageToFetch);
  }, [pageToFetch]);

  useEffect(() => {
    if (isBottom) {
      increasePage();
    }
  }, [isBottom]);

  function increasePage() {
    setPageToFetch(pageToFetch + 1);
  }

  return (
    <div className={s.root}>
      <h1>Rand'images</h1>
      <h2>Download random open source images</h2>
      <ImageList imageList={imageList} />
      {isLoading && <div className="spinner-border" role="status" />}
    </div>
  );
}
