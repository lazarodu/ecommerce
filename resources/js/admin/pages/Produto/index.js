import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { FaPencilAlt, FaTrashAlt, FaPlusCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import {
  apiCategoria,
  apiProduto,
  apiProdutoDeleted,
  apiCategoriaDeleted,
} from "../../../services/data";
import { Table, Categoria, Produto } from "../../components";
import { Loading } from "../../../components";
import { Button } from "../../styles";
import { Container } from "./styles";
const route = process.env.MIX_APP_ROUTE;

const Produtos = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [categorias, setCategorias] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const history = useHistory();
  const { idcat, idprod } = useParams();

  const fetchData = async () => {
    try {
      let categories;
      const categoriaDeleted = document.querySelector("#categoriaDeleted")
        ?.checked;
      if (categoriaDeleted) {
        categories = await apiCategoriaDeleted.index();
      } else {
        categories = await apiCategoria.index();
      }
      setCategorias(categories.data.data);
      let products;
      const produtoDeleted = document.querySelector("#produtoDeleted")?.checked;
      if (produtoDeleted) {
        products = await apiProdutoDeleted.index();
      } else {
        products = await apiProduto.index();
      }
      setProdutos(products.data.data);
    } catch (error) {
      toast.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [idcat, idprod]);

  const handleRemoveCategoria = useCallback(async ({ id }) => {
    try {
      await apiCategoria.destroy(id);
      fetchData();
      toast.success("Removido com sucesso!");
    } catch (error) {
      toast.error(error);
    }
  }, []);

  const handleRemoveProduto = useCallback(async ({ id }) => {
    try {
      await apiProduto.destroy(id);
      fetchData();
      toast.success("Removido com sucesso!");
    } catch (error) {
      toast.error(error);
    }
  }, []);

  const columnCategorias = useMemo(
    () => [
      {
        Header: "Categorias",
        columns: [
          {
            Header: "Nome",
            accessor: "nome",
          },
        ],
      },
      {
        Header: "Operações",
        columns: [
          {
            Header: "Editar",
            Cell: ({ cell }) => (
              <Button
                bgColor="primary"
                onClick={() =>
                  history.push(
                    `${route}/home/categorias/${cell.row.original.id}`
                  )
                }
              >
                <FaPencilAlt />
              </Button>
            ),
          },
          {
            Header: "Remover",
            Cell: ({ cell }) => (
              <Button
                bgColor="danger"
                onClick={() => handleRemoveCategoria({ ...cell.row.original })}
              >
                <FaTrashAlt />
              </Button>
            ),
          },
        ],
      },
    ],
    []
  );

  const columnProdutos = useMemo(
    () => [
      {
        Header: "Produtos",
        columns: [
          {
            Header: "Categoria",
            accessor: "categoria.nome",
          },
          {
            Header: "Nome",
            accessor: "nome",
          },
          {
            Header: "Quantidade",
            accessor: "quantidade",
          },
          {
            Header: "Preço",
            accessor: "preco",
          },
          {
            Header: "Imagens",
            accessor: ({ imagens }) =>
              imagens.map((item) => (
                <div key={item.id}>
                  <img
                    src={`/storage/${item.url.replace("public/", "")}`}
                    width="100px"
                  />
                </div>
              )),
          },
        ],
      },
      {
        Header: "Operações",
        columns: [
          {
            Header: "Editar",
            Cell: ({ cell }) => (
              <Button
                bgColor="primary"
                onClick={() =>
                  history.push(`${route}/home/produtos/${cell.row.original.id}`)
                }
              >
                <FaPencilAlt />
              </Button>
            ),
          },
          {
            Header: "Remover",
            Cell: ({ cell }) => (
              <Button
                bgColor="danger"
                onClick={() => handleRemoveProduto({ ...cell.row.original })}
              >
                <FaTrashAlt />
              </Button>
            ),
          },
        ],
      },
    ],
    []
  );

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Container className="container">
          <Tabs>
            <TabList>
              <Tab>Produtos</Tab>
              <Tab>Categorias</Tab>
            </TabList>
            <TabPanel>
              {idprod ? (
                <Produto />
              ) : (
                <>
                  <Button
                    onClick={() => history.push(`${route}/home/produtos/0`)}
                  >
                    <FaPlusCircle /> Adicionar
                  </Button>
                  <input
                    type="checkbox"
                    name="produtoDeleted"
                    id="produtoDeleted"
                    onClick={() => fetchData()}
                  />
                  <Table columns={columnProdutos} data={produtos} />
                </>
              )}
            </TabPanel>
            <TabPanel>
              {idcat ? (
                <Categoria />
              ) : (
                <>
                  <Button
                    onClick={() => history.push(`${route}/home/categorias/0`)}
                  >
                    <FaPlusCircle /> Adicionar
                  </Button>
                  <input
                    type="checkbox"
                    name="categoriaDeleted"
                    id="categoriaDeleted"
                    onClick={() => fetchData()}
                  />
                  <Table columns={columnCategorias} data={categorias} />
                </>
              )}
            </TabPanel>
          </Tabs>
        </Container>
      )}
    </>
  );
};

export default Produtos;
