import ProductCard from "@/components/cards/ProductCard";
import { RawProduct } from "@/types";
import React from "react";

type Props = {
  data: RawProduct[];
};
const Store = ({ data }: Props) => {
  return (
    <div className="container">
      <div className="grid grid-cols-1 md:grid-cols-2 min-[1024px]:grid-cols-3 lg:grid-cols-4 gap-y-4">
        {data.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Store;
