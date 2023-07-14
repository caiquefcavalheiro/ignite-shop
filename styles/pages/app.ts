import { styled } from "..";

export const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
});

export const Header = styled("header", {
  padding: "2rem 0",
  width: "100%",
  maxWidth: 1100,
  margin: "0 auto",

  display: "flex",
  justifyContent: "space-between",
});

export const HeaderIcon = styled("div", {
  display: "flex",
  alignItems: "center",
  padding: "0.75rem",
  background: "$gray800",
  borderRadius: 8,
  cursor: "pointer",
  position: "relative",
  top: "10px",
  right: "10px",

  span: {
    position: "absolute",
    top: "-10px",
    right: "-10px",
    fontSize: "0.875rem",
    background: "$green300",
    padding: "0.25rem 0.5rem",
    borderRadius: 999,
    boxShadow: "0 0 0 2px #121214",
  },
});

export const CartMain = styled("main", {
  position: "absolute",
  top: 0,
  right: 0,
  width: "30rem",
  height: "100vh",
  background: "$gray800",
  padding: "3rem",
  zIndex: 1,
});

export const CartContainer = styled("div", {
  h3: {
    fontSize: "1.25rem",
    fontWeight: "bold",
  },

  "& > button": {
    position: "absolute",
    top: 24,
    right: 24,
    border: 0,
    background: "transparent",
    color: "$gray300",
    cursor: "pointer",
  },

  "& > h3": {
    marginTop: "4.5rem",
    marginBottom: "2rem",
  },
});

export const CartList = styled("ul", {
  height: "60vh",
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem",
});

export const CartProduct = styled("div", {
  display: "flex",
  gap: "1.25rem",

  img: {
    background: "linear-gradient(180deg, #1ea483 0%, #7465d4 100%)",
    width: "6rem",
    height: "6rem",
  },
});

export const CartProductInfo = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",

  p: {
    fontSize: "1.125rem",
    color: "$gray300",
  },

  strong: {
    color: "$gray100",
    fontSize: "1.125rem",
    fontWeight: "bold",
    lineHeight: 1.6,
  },

  button: {
    border: 0,
    background: "transparent",
    color: "$green500",
    fontSize: "1rem",
    lineHeight: 1.6,
    textAlign: "left",
    fontWeight: "bold",
    cursor: "pointer",
  },
});

export const CartResume = styled("div", {
  position: "absolute",
  bottom: 0,
  right: 0,
  marginBottom: "3rem",
  marginRight: "3rem",

  width: "24rem",

  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",

  "& > div": {
    display: "flex",
    justifyContent: "space-between",
  },

  strong: {
    fontSize: "1.125rem",
    fontWeight: "bold",
    color: "$gray100",
    lineHeight: 1.6,
  },

  button: {
    marginTop: "3rem",
    fontSize: "1.125rem",
    fontWeight: "bold",
    color: "$white",
    padding: "1.25rem",
    background: "$green300",
    border: "none",
    borderRadius: 8,
    lineHeight: 1.6,
    cursor: "pointer",
    transition: "all 0.2s",

    "&:hover": {
      background: "$green500",
    },
  },
});
