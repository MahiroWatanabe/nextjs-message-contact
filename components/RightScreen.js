import BooleanContext from "@/contexts/displayContext";
import { useContext } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import Restaurant from "./Restaurant";

const RightScreen = () => {
  const router = useRouter();
  const queryParams = router.query.service;
  const { displayright, toggleBooleanValue } = useContext(BooleanContext);

  return (
    displayright && (
      <>
        {queryParams === "restaurant" && <Restaurant />}
        {queryParams === "trip" && <h1>hello</h1>}
      </>
    )
  );
};

export default RightScreen;
