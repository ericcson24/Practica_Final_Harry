import { FunctionalComponent } from "preact/src/index.d.ts";
import Form from "../components/Form.tsx";
import { useState } from "preact/hooks";

const Entry: FunctionalComponent = () => {
    const [login, setLogin] = useState<boolean>(true)
    return (
        <div>
            <h1>{login ? "Iniciar Sesión"  : "Registrarse"}</h1>
            <Form login={login}/>
            <button type="button" onClick={() => setLogin(!login)}>{!login ? "Iniciar Sesión" : "Registrarse"}</button>
        </div>
    )
}
//prueba
export default Entry