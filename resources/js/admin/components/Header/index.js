import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { FaHome } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { BiUserCircle } from "react-icons/bi";
import { SiInstacart } from "react-icons/si";
import { GrMoney } from "react-icons/gr";

import { Link } from "../../styles";
import { Container } from "./style";
import { Loading } from "../";

const Header = () => {
  const history = useHistory();
  const route = process.env.MIX_APP_ROUTE;
  const [isLoading, setIsLoading] = useState(true);

  const handleSignout = useCallback(() => {
    toast.error("Volte Sempre!");
    window.location.href = "/";
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Container>
          <div className="container">
            <FaHome onClick={() => history.push(`${route}/home`)} />
            <Link onClick={() => history.push(`${route}/home/produtos`)}>
              Produtos <SiInstacart />
            </Link>
            <Link onClick={() => history.push(`${route}/home/vendas`)}>
              Produtos <GrMoney />
            </Link>
            <div>
              <BiUserCircle onClick={() => history.push(`${route}/users`)} />
              <IoIosLogOut onClick={handleSignout} />
            </div>
          </div>
        </Container>
      )}
    </>
  );
};

export default Header;
