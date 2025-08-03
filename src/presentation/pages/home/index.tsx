import { Title } from "@components/core/title";

import * as styles from "./styles/home-page.css";

export const HomePage = () => {
  return (
    <div className={styles.containerPage}>
      <Title.Root size="medium">
        <Title.Text>Bem-vindos 👋</Title.Text>
      </Title.Root>

      <p className={styles.paragrafo_home}>
        Obrigado pela oportunidade de participar deste desafio técnico!<br /><br />
        Eu separei meu desenvolvimento em 4 etapas: funcionalidades obrigatórias, limpeza de código, estilização e funcionalidades extras.<br /><br />
        O maior desafio foi na lógica de reversão de exclusão com múltiplos cards isolados, foi o que eu levei mais tempo pra fazer por conta de achar a maneira certa de isolar os cards pra que cada um se comportasse de forma única.
        <br /><br />
        Posso esclarecer sobre qualquer ponto do projeto, explicar minhas decisões ou melhorias futuras.
      </p>
    </div>
  );
};

