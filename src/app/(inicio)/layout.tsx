import { Header } from "@components/core/header";
import { Sidebar } from "@components/core/sidebar";
import { Title } from "@components/core/title";
import { MENU_RESOURCES_CONFIGS } from "@config/menu";
import { ReactNode } from "react";
import * as styles from "./styles.css";

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <main className={styles.homeLayoutStyle}>
      <Sidebar.Root>
        <Sidebar.Menu resources={MENU_RESOURCES_CONFIGS} />
      </Sidebar.Root>
      <div className={styles.containerPageStyles}>
        <Header.Root>
          <Header.LeftGroup className={styles.headerGroupStyles}>
            <Title.Root size="small">
              {/* <Title.Text>Centrais </Title.Text> */}
            </Title.Root>
          </Header.LeftGroup>
        </Header.Root>
        {children}
      </div>
    </main>
  );
}
