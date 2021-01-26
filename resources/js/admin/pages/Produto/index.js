import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { FaPencilAlt, FaTrashAlt, FaPlusCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import { apiCategoria } from "../../../services/data";
import { Loading, Table } from "../../components";
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
      const categories = await apiCategoria.index();
      setCategorias(categories.data.data);
    } catch (error) {
      toast.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRemoveCategoria = useCallback(async ({ id }) => {
    try {
      apiCategoria.delete(id);
      fetchData();
      toast.success("Removido com sucesso!");
    } catch (error) {
      toast.error(error);
    }
  }, []);

  const handleRemoveProduto = useCallback(async ({ id }) => {
    try {
      apiProduto.delete(id);
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
