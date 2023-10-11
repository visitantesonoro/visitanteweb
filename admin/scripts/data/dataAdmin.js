import { baseUri } from "../../enviroment.js?ad=6";
import { admin } from "../classes/Admin.js?ad=6";
import { pintarLogin } from "../componentes/Login.js?ad=6";

export const logear = async(usuario) =>{
    const direccionLogin = `${baseUri}/admin/administradores/login`;

    const email = usuario.email;
    const password = usuario.password;

    const response = await fetch(direccionLogin, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const responseData = await response.json();

    if (responseData.adminData) {
      admin.info = responseData.adminData;

      localStorage.setItem(
        "administrador",
        JSON.stringify({
          adminId: responseData.adminData.id,
          adminEmail: responseData.adminData.email,
          token: responseData.adminData.token,
        })
      );

      return true;
    } else {
      alert(responseData);
    }
}

export const logout = ()=>{
  admin.info = null;
  localStorage.removeItem("administrador");
  pintarLogin();
}