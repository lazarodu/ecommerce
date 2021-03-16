import React, { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Loading } from "../../../components";
import { Container } from "./styles";
import { apiCarrinho, apiCompra } from "../../../services/data";
import { FaTrashAlt } from "react-icons/fa";

const Main = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [produtos, setProdutos] = useState([]);
  const [total, setTotal] = useState(0);
  const { register, handleSubmit } = useForm();

  const fetchData = async () => {
    try {
      const response = await apiCarrinho.index();
      setProdutos(response.data.data);
      const map = response.data.data.map(
        (item) => Number(item.quantidade) * Number(item.produto.preco)
      );
      setTotal(map.reduce((prev, num) => prev + num));
    } catch (error) {
      toast.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = useCallback(
    async ({ id, quantidade, produto_id }) => {
      try {
        await apiCarrinho.update(id, { quantidade, produto_id });
        await fetchData();
        toast.success("Quantidade Atualizada");
      } catch (error) {
        toast.error(error);
      }
    },
    [produtos]
  );

  const handleDelete = useCallback(async (id) => {
    try {
      await apiCarrinho.destroy(id);
      toast.success("Produto removido do carrinho");
      fetchData();
    } catch (error) {
      toast.error(error);
    }
  }, []);

  const onSubmit = useCallback(async () => {
    try {
      await apiCompra.store({ total });
      toast.success("Compra realizada");
      window.location.href = "/";
    } catch (error) {
      toast.error(error);
    }
  }, [total]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Container className="container">
            <form method="POST" onSubmit={handleSubmit(onSubmit)}>
              <table>
                <thead>
                  <tr>
                    <th colSpan="2">Item</th>
                    <th>Preços</th>
                    <th>Quantidade</th>
                    <th>Subtotal</th>
                    <th>Remover</th>
                  </tr>
                </thead>
                <tbody>
                  {produtos &&
                    produtos.map((item, key) => (
                      <tr key={key}>
                        <td>
                          <img
                            src={`/storage/${item.produto.imagens[0].url.replace(
                              "public/",
                              ""
                            )}`}
                            width="100px"
                          />
                        </td>
                        <td>{item.produto.nome}</td>
                        <td>R$ {item.produto.preco}</td>
                        <td>
                          <input
                            type="hidden"
                            name={`${key}.id`}
                            value={item.id}
                            ref={register}
                          />
                          <input
                            type="hidden"
                            name={`${key}.produto_id`}
                            value={item.produto_id}
                            ref={register}
                          />
                          <input
                            name={`${key}.quantidade`}
                            type="number"
                            min="1"
                            max={item.produto.quantidade}
                            ref={register({ required: true })}
                            required
                            value={item.quantidade}
                            onChange={(e) =>
                              handleChange({
                                id: item.id,
                                quantidade: e.target.value,
                                produto_id: item.produto_id,
                              })
                            }
                          />
                        </td>
                        <td>
                          R$ {(item.produto.preco * item.quantidade).toFixed(2)}
                        </td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => handleDelete(item.id)}
                          >
                            <FaTrashAlt />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th colSpan="4" style={{ textAlign: "center" }}>
                      Total
                    </th>
                    <th colSpan="2">{total > 0 && `R$ ${total.toFixed(2)}`}</th>
                  </tr>
                </tfoot>
              </table>
              <button type="submit" className="btn btn-primary">
                Finalizar a Compra
              </button>
            </form>
          </Container>
        </>
      )}
    </>
  );
};

export default Main;
