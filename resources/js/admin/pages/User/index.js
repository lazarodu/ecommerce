import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { FaRegSave } from "react-icons/fa";
import { Loading } from "../../../components";
import { Table, Form, Select, Button } from "../../styles";
import { Container } from "./styles";
import { apiUser } from "../../../services/data";

const User = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const { register, handleSubmit } = useForm();

  const fetchData = async () => {
    try {
      const response = await apiUser.index();
      setUsers(response.data.data);
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
      await apiUser.update(item.id, item);
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
            <Table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>E-mail</th>
                  <th>Perfil</th>
                </tr>
              </thead>
              <tbody>
                {users &&
                  users.map((user, key) => (
                    <tr key={key}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <input
                          type="hidden"
                          name={`${key}.id`}
                          value={user.id}
                          ref={register}
                        />
                        <Select
                          name={`${key}.perfil`}
                          ref={register({ required: true })}
                          defaultValue={user.perfil}
                        >
                          <option value="admin">admin</option>
                          <option value="cliente">cliente</option>
                        </Select>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
            <Button type="submit">
              <FaRegSave /> Salvar
            </Button>
          </Form>
        </Container>
      )}
    </>
  );
};

export default User;
