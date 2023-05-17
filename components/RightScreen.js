import BooleanContext from "@/contexts/displayContext";
import { useContext } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import Restaurant from "./Restaurant";
import Trip from "./Trip";

const RightScreen = () => {
  const router = useRouter();
  const queryParams = router.query.service;
  const { displayright, toggleBooleanValue } = useContext(BooleanContext);

  return (
    displayright && (
      <>
        {queryParams === "restaurant" && <Restaurant />}
        {queryParams === "trip" && <Trip />}
      </>
    )
  );
};

export default RightScreen;
