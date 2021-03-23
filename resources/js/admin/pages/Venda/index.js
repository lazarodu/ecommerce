import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { FaRegSave } from "react-icons/fa";
import { Loading } from "../../../components";
import { Table, Form, Select, Button } from "../../styles";
import { Container } from "./styles";
import { apiCompra } from "../../../services/data";

const Venda = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [compras, setCompras] = useState([]);
  const { register, handleSubmit } = useForm();

  const fetchData = async () => {
    try {
      const response = await apiCompra.index();
      setCompras(response.data.data);
    } catch (error) {
      toast.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onSubmit = useCallback(async (data) => {
    // https://oieduardorabelo.medium.com/javascript-armadilhas-do-asyn-await-em-loops-1cdad44db7f0
    setIsLoading(true);
    const promises = Object.values(data).map(async (item) => {
      await apiCompra.update(item.id, item);
    });
    try {
      await Promise.all(promises);
      await fetchData();
    } catch (error) {
      toast.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Container className="container">
          <Form method="POST" onSubmit={handleSubmit(onSubmit)}>
            {compras &&
              compras.map((compra, key) => (
                <div key={key}>
                  <Table>
                    <thead>
                      <tr>
                        <th>Produto</th>
                        <th>Preço</th>
                        <th>Quantidade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {compra.carrinhos.map((carrinho, cod) => (
                        <tr key={cod}>
                          <td>{carrinho.produto.nome}</td>
                          <td>R$ {carrinho.produto.preco}</td>
                          <td>{carrinho.quantidade}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <th colSpan="2">Total</th>
                        <th>R$ {compra.total}</th>
                      </tr>
                    </tfoot>
                  </Table>
                  <label>Status: {compra.status}</label>
                  <input
                    type="hidden"
                    name={`${key}.id`}
                    value={compra.id}
                    ref={register}
                  />
                  <Select
                    name={`${key}.status`}
                    ref={register({ required: true })}
                    defaultValue={compra.status}
                  >
                    <option value="confirmado">confirmado</option>
                    <option value="pago">pago</option>
                    <option value="enviado">enviado</option>
                    <option value="entregue">entregue</option>
                  </Select>
                </div>
              ))}
            <Button type="submit">
              <FaRegSave /> Salvar
            </Button>
          </Form>
        </Container>
      )}
    </>
  );
};

export default Venda;
