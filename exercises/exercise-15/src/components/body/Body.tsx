import { useAppDispatch } from "../../app/hooks";
import { useEffect } from "react";
import "./Body.scss";
import { fetchCategories } from "../../features/category/CategorySlice";
import Category from "./category/Category";

const Body = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="body">
      <Category />
    </div>
  );
};

export default Body;
