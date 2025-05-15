"use client";

import { SelectRegion } from "./custom";
import { useRegion } from "@/hooks/useRegion";

const Select = () => {
  const { region, setRegion } = useRegion();

  if (region === null) return null;

  return (
    <SelectRegion
      value={region}
      onValueChange={setRegion}
      color="white"
      className="max-w-[30rem]"
    />
  );
};

export default Select;
