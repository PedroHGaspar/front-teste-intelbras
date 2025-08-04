import { useTheme } from "../../presentation/contexts/theme-context";
import { MoonIcon } from "../../presentation/components/icons/MoonIcon";
import { SunIcon } from "../../presentation/components/icons/SunIcon";
import * as style from "../../presentation/pages/home/styles/centrals-page.css";

export function BotaoToggleTema() {
    const { isDark, toggleTheme } = useTheme();

    return (
        <button className={style.botao_darkmode} onClick={toggleTheme} title="Alternar tema">
            {isDark ? <SunIcon customSize="14" /> : <MoonIcon customSize="14" />}
        </button>
    );
}