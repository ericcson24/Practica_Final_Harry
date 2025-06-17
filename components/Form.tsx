import { FunctionalComponent } from "preact/src/index.d.ts";

type Data = {
    login: boolean
}

const Form:FunctionalComponent<Data> = (props) => {
    return (
        <form action="/home" method="POST">
            <input type="text" name="user" placeholder="Usuario" required/>
            <input type="email" name="email" placeholder="Correo electrónico" required={!props.login} hidden={props.login}/>
            <input type="password" name="password" placeholder="Contraseña" required/>
            <button type="submit">Entrar</button>
        </form>
    )
}

export default Form