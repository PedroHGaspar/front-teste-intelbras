import { useEffect } from "react";
import { useSuccessStore } from "./utils/services/successStore";
import { SuccessAnimation } from "./animations/success";//achei essa animaçao no projeto base e decidi usar
import * as style from "../../presentation/pages/home/styles/centrals-page.css";

export function NotificacaoSucesso() {
    const { centralCriada, limparCentralCriada } = useSuccessStore();

    useEffect(() => {
        if (centralCriada) {
            const timer = setTimeout(() => {
                limparCentralCriada();
            }, 6000);

            return () => clearTimeout(timer);//sumir o card
        }
    }, [centralCriada]);//centralCriada é usada, aqui é disparado

    if (!centralCriada) return null;//obrigado a fazer essa verificacao por que se nao ele da erro de possibbly null

    return (
        <div className={style.notificacao_card_sucesso}>
            <p>A central <strong>{centralCriada.name}</strong> foi criada com sucesso.</p>
            <SuccessAnimation style={{ width: 60, height: 60 }} />
        </div>
    );
}
