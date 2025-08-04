import { style } from "@vanilla-extract/css";
// import { vars } from '../../presentation/pages/home/styles/themes.css';

export const homeLayoutStyle = style({
  width: "100%",
  // height: "100%",
  height: "100vh",
  paddingTop: "1rem",
  paddingBottom: "1rem",
  paddingLeft: "1rem",
  display: "flex",
  flexDirection: "row",
  // background: vars.color.background,
});

export const containerPageStyles = style({
  width: "100%",
  display: "flex",
  flexDirection: "column",
});

export const headerGroupStyles = style({
  display: "flex",
  alignItems: "center",
  marginLeft: "5%",
});
