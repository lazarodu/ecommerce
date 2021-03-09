import React, { useEffect, useState, useCallback } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { FaHandPointLeft, FaSave } from "react-icons/fa";
import { Input, Button, Link, Form } from "../../styles";
import { apiCategoria } from "../../../services/data";
import { Loading } from "../";

const Categoria = () => {
  const { idcat } = useParams();
  const history = useHistory();
  const { register, handleSubmit } = useForm();
  const [categoria, setCategoria] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const route = process.env.MIX_APP_ROUTE;

  useEffect(() => {
    if (idcat > 0) {
      const fetchData = async (idcat) => {
        try {
          let categories;
          const categoriaDeleted = document.querySelector("#categoriaDeleted")
            ?.checked;
          if (categoriaDeleted) {
            categories = await apiCategoriaDeleted.show(idcat);
          } else {
            categories = await apiCategoria.show(idcat);
          }
          setCategoria(categories.data.data);
        } catch (error) {
          toast.error(error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchData(idcat);
    } else {
      setIsLoading(false);
    }
  }, [idcat]);

  const handleChange = useCallback(
    async (e) => {
      setCategoria({ ...categoria, [e.target.name]: e.target.value });
    },
    [categoria]
  );

  const onSubmit = useCallback(
    async (data) => {
      try {
        if (data.id > 0) {
          await apiCategoria.update(data.id, data);
          toast.success("Categoria alterada");
        } else {
          await apiCategoria.store(data);
          toast.success("Categoria cadastrada");
        }
        history.push(`${route}/home/produtos`);
      } catch (error) {
        toast.error(
          error.response.data ? error.response.data.join("\n") : error.message
        );
      }
    },
    [history]
  );

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Link
            onClick={() => history.push(`${route}/home/categorias`)}
            bgColor="warning"
          >
            <FaHandPointLeft /> Voltar
          </Link>
          <Form method="POST" onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" name="id" value={idcat || ""} ref={register} />
            <div>
              <label htmlFor="nome">Nome:</label>
              <Input
                type="text"
                name="nome"
                id="nome"
                ref={register({ required: true })}
                required
                value={categoria.nome || ""}
                onChange={handleChange}
              />
            </div>

            <Button bgColor="success" type="submit">
              <FaSave /> Salvar
            </Button>
          </Form>
        </>
      )}
    </>
  );
};

export default Categoria;
