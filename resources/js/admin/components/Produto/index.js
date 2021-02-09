import React, { useEffect, useState, useCallback } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { FaHandPointLeft, FaSave } from "react-icons/fa";
import { Input, Select, Button, Link, Form } from "../../styles";
import { apiProduto, apiCategoria } from "../../../services/data";
import { Loading } from "../";

const Produto = () => {
  const { idcat } = useParams();
  const history = useHistory();
  const { register, handleSubmit } = useForm();
  const [produto, setProduto] = useState([]);
  const [categoria, setCategoria] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const route = process.env.MIX_APP_ROUTE;

  useEffect(() => {
    const loadCategorias = async () => {
      const categories = await apiCategoria.index();
      setCategoria(categories.data.data);
    };
    if (idcat > 0) {
      const fetchData = async (idcat) => {
        try {
          const products = await apiProduto.show(idcat);
          setProduto(products.data.data);
        } catch (error) {
          toast.error(error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchData(id);
    } else {
      setIsLoading(false);
    }
    loadCategorias();
  }, [idcat]);

  const handleChange = useCallback(
    async (e) => {
      setProduto({ ...produto, [e.target.name]: e.target.value });
    },
    [produto]
  );

  const onSubmit = useCallback(
    async (data) => {
      try {
        if (data.id > 0) {
          await apiProduto.update(data.id, data);
          toast.success("Produto alterado");
        } else {
          await apiProduto.store(data);
          toast.success("Produto cadastrado");
        }
        history.push(`${route}/home/produtos`);
      } catch (error) {
        toast.error(error.message);
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
            onClick={() => history.push(`${route}/home/produtos`)}
            bgColor="warning"
          >
            <FaHandPointLeft /> Voltar
          </Link>
          <Form method="POST" onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" name="id" value={idcat || ""} ref={register} />
            <div>
              <label htmlFor="categoria">Categorias:</label>
              <Select
                name="categoria_id"
                id="categoria"
                ref={register({ required: true })}
                required
                value={produto.categoria_id || ""}
                onChange={handleChange}
              >
                <option></option>
                {categoria.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.nome}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <label htmlFor="nome">Nome:</label>
              <Input
                type="text"
                name="nome"
                id="nome"
                ref={register({ required: true })}
                required
                value={produto.nome || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="quantidade">Quantidade:</label>
              <Input
                type="number"
                name="quantidade"
                id="quantidade"
                ref={register({ required: true })}
                required
                value={produto.quantidade || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="imagens">Imagens:</label>
              <Input
                type="file"
                name="files[]"
                id="imagens"
                multiple
                ref={register}
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

export default Produto;
