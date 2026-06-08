import React, { useRef } from "react";
import { useEffect } from "react";
import mount from "marketing/marketingApp";

export default function marketingComponent() {
  const ref = useRef(null);

  useEffect(() => {
    mount(ref.current);
  }, []);

  return <div ref={ref}></div>;
}
