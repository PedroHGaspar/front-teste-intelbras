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
        Eu separei meu desenvolvimento em 4 etapas: funcionalidades obrigatórias, limpeza de código, estilização e funcionalidades extras.
        <br /><br />
        Tive 3 grandes desafios:
        <br />
        Na lógica de reversão de exclusão com múltiplos cards isolados, foi o que eu levei mais tempo pra fazer por conta de achar a maneira certa de isolar os cards pra que cada um se comportasse de forma única.
        <br />
        Inventei de querer fazer darkmode e não ficou do jeito que eu esperava por conta das cores, me faltou um pouco de criatividade pra achar uma "sinfonia" entre as cores para fazer um darkmode bonito aonde as cores conversassem! Eu pessoalmente gostei mais do modo escuro (o modo claro ficou feio kkk).
        <br />
        Deixei pra fazer os filtros no último dia (segunda feira), pois era um desafio extra. Acabou que foi ótimo por que eu tive que refazer minha lógica do useCentrals pois encontrei um problema na ordenação e na busca por nome/modeloId. No final deu certo e consegui executar da forma correta.
        <br /><br />
        É isso, qualquer dúvida estou a disposição, ageradeço pela oportunidade de fazer o teste :D
      </p>
    </div>
  );
};

