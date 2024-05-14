import React, { useEffect, useState } from "react";
import { useNavigate, NavigateOptions } from "react-router-dom";

import { determineAddressType } from "../utils/address-type-checker";

const Home = () => {
  const [errorMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let location = window.location.href;
    let address = location.endsWith("/") ? location.slice(0, -1) : location;

    const addressType = determineAddressType(address);

    if (addressType === "empt") {
      setErrMsg("Field must not be empty");
    } else if (addressType === "err") {
      setErrMsg("Must be a valid URL, IPv4 or IPv6 Address");
    } else {
      // if the addressType is 'url' and address doesn't start with 'http://' or 'https://', prepend 'https://'
      if (addressType === "url" && !/^https?:\/\//i.test(address)) {
        address = "https://" + address;
      }
      const resultRouteParams = { state: { address, addressType } };
      navigate(`/results/${encodeURIComponent(address)}`, resultRouteParams);
    }
  }, []);

  return <div>Home</div>;
};

export default Home;
