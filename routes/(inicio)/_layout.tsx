import { PageProps } from "$fresh/server.ts";
import Footer from "../../components/Footer.tsx";
import Header from "../../islands/Header.tsx";

export default ({Component}: PageProps) => {
    return (
        <div class="layout">
            <Header/>
            <main><Component/></main>
            <Footer/>
        </div>
    )
}