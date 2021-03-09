import React, { useEffect, useState, useCallback } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { FaHandPointLeft, FaSave, FaTrashAlt } from "react-icons/fa";
import { Input, Select, Button, Link, Form } from "../../styles";
import { apiProduto, apiCategoria, apiImagem } from "../../../services/data";
import { Loading } from "../";

const Produto = () => {
  const { idprod } = useParams();
  const history = useHistory();
  const { register, handleSubmit } = useForm();
  const [produto, setProduto] = useState([]);
  const [categoria, setCategoria] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const route = process.env.MIX_APP_ROUTE;

  const fetchData = async (idprod) => {
    try {
      const products = await apiProduto.show(idprod);
      setProduto(products.data.data);
    } catch (error) {
      toast.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const loadCategorias = async () => {
      const categories = await apiCategoria.index();
      setCategoria(categories.data.data);
    };
    if (idprod > 0) {
      fetchData(idprod);
    } else {
      setIsLoading(false);
    }
    loadCategorias();
  }, [idprod]);

  const handleChange = useCallback(
    async (e) => {
      setProduto({ ...produto, [e.target.name]: e.target.value });
    },
    [produto]
  );

  const handleRemoveImage = useCallback(async ({ id }) => {
    try {
      await apiImagem.delete(id);
      fetchData(idprod);
      toast.success("Removido com sucesso!");
    } catch (error) {
      toast.error(error);
    }
  }, []);

  const onSubmit = useCallback(
    async (data) => {
      try {
        const { files } = data;
        const fileData = new FormData();
        fileData.set("categoria_id", data.categoria_id);
        fileData.set("nome", data.nome);
        fileData.set("quantidade", data.quantidade);
        fileData.set("preco", data.preco);
        for (let i = 0; i < files.length; i++) {
          fileData.append("files[]", files[i]);
        }
        if (data.id > 0) {
          fileData.append("_method", "PUT");
          await apiProduto.update(data.id, fileData);
          toast.success("Produto alterado");
        } else {
          await apiProduto.store(fileData);
          toast.success("Produto cadastrado");
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
            onClick={() => history.push(`${route}/home/produtos`)}
            bgColor="warning"
          >
            <FaHandPointLeft /> Voltar
          </Link>
          <Form method="POST" onSubmit={handleSubmit(onSubmit)}>
            <input
              type="hidden"
              name="id"
              value={idprod || ""}
              ref={register}
            />
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
              <label htmlFor="preco">Preço:</label>
              <Input
                type="number"
                step="0.01"
                name="preco"
                id="preco"
                ref={register({ required: true })}
                required
                value={produto.preco || ""}
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
            {produto.imagens &&
              produto.imagens.map((item) => (
                <div key={item.id}>
                  <label>
                    <Button
                      type="button"
                      bgColor="danger"
                      onClick={() => handleRemoveImage({ id: item.id })}
                    >
                      <FaTrashAlt />
                    </Button>
                  </label>
                  <img
                    src={`/storage/${item.url.replace("public/", "")}`}
                    width="100px"
                  />
                </div>
              ))}

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
