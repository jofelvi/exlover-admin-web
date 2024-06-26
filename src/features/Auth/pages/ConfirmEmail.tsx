import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useVerifyEmailQuery } from "../services/auth";

function ConfirmEmailPage() {
  const { userId, token } = useParams(); // Get parameters from URL
  const navigate = useNavigate();
  const finalToken = token && decodeURIComponent(token); // Decode the received token

  const { isLoading, error, isSuccess } = useVerifyEmailQuery(
    userId,
    finalToken,
  );

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        navigate("/login"); // Redirect to the home page after 1 second
      }, 2000);
    }
  }, [isSuccess, navigate]);

  /* const handleOpenModal = () => {
    dispatch(
      openModal({
        tittle: 'Correo Confirmado Exitosamente',
        content: bodyModal,
        accions: (
          <>
            <Button onClick={() => handleBtnCloseModal()}>Aceptar</Button>
          </>
        ),
      }),
    )
  }*/

  if (isLoading)
    return <div>Por favor espere. Estamos verificando su correo.</div>;
  if (error) return <div>Error: {error.data}</div>;
  if (isSuccess) return <div>correo Verificado </div>;
}

export default ConfirmEmailPage;
