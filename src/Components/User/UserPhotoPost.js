import React from "react";
import styles from "./UserPhotoPost.module.css";
import Input from "../../Components/Forms/Input";
import useForm from "../../Hooks/useForm";
import Button from "../Forms/Button";
import Error from "../Helper/Error";
import useFetch from "../../Hooks/useFetch";
import { PHOTO_POST } from "../../api";
import { useNavigate } from "react-router-dom";
import Head from "../Helper/Head";

const UserPhotoPost = () => {
  const nome = useForm();
  const peso = useForm("number");
  const idade = useForm("number");
  const [img, setImg] = React.useState({});
  const { data, error, loading, request } = useFetch();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (data) navigate("/conta");
  }, [data, navigate]);

  const handleImgChange = ({ target }) => {
    setImg({
      preview: URL.createObjectURL(target.files[0]),
      raw: target.files[0],
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (nome.validate() && peso.validate() && idade.validate()) {
      const formData = new FormData();
      formData.append("img", img.raw);
      formData.append("nome", nome.value);
      formData.append("peso", peso.value);
      formData.append("idade", idade.value);

      const token = window.localStorage.getItem("token");
      const { url, options } = PHOTO_POST(formData, token);
      request(url, options);
    }
  };

  return (
    <section className={`container animeLeft ${styles.photoPost}`}>
      <Head title="Post sua foto" />
      <form onSubmit={handleSubmit}>
        <Input label="Nome" id="nome" name="nome" type="text" {...nome} />
        <Input label="Peso" id="peso" name="peso" type="text" {...peso} />
        <Input label="Idade" id="idade" name="idade" type="text" {...idade} />
        <input
          className={styles.file}
          type="file"
          name="img"
          id="img"
          onChange={handleImgChange}
        />
        {loading ? (
          <Button disabled>Enviando...</Button>
        ) : (
          <Button>Enviar</Button>
        )}
        <Error error={error} />
      </form>
      <div>
        {img.preview && (
          <div
            className={styles.preview}
            style={{ backgroundImage: `url('${img.preview}')` }}
          ></div>
        )}
      </div>
    </section>
  );
};

export default UserPhotoPost;
