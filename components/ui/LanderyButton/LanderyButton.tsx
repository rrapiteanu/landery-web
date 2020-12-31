import Button from "@material-ui/core/Button";
import styled from "styled-components";

const StyledButton = styled(Button)`
  ${({ theme, color }) => `
    background: ${color === "primary" ? theme.palette.primary.main : color};
    border-radius: 3px;
    border: 0;
    color: white;
    height: 48px;
    padding: 0 30px;
    box-shadow: 0 3px 5px 2px rgba(255, 105, 135, 0.3);

    &:hover {
      background: ${color === "primary" ? theme.palette.primary.main : color};
      opacity: 0.5;
    }
  `}
`;

const SimpleButton = styled.button`
  padding: 10px 25px;
  cursor: pointer;
  outline: none;
  display: inline-block;
  width: auto;
  height: 40px;
  line-height: 40px;
  padding: 0 14px;
  font-size: 15px;
  background-color: transparent;
  border-radius: 5px;
  border-style: solid;
  border-width: 2.4px;
  transition: "background-color", 0.2s;
  background-color: #796eff;
  border-color: #796eff;
  color: white;
  font-weight: 600 !important;
  &:hover {
    background-color: #594fc7;
    border-color: #594fc7;
  }
`;

const IntenseButton = styled.button`
  padding: 10px 25px;
  outline: none;
  display: inline-block;
  width: auto;
  height: 40px;
  line-height: 40px;
  padding: 0 14px;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  border: none;
  border-radius: 4px;
  font-size: 15px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.025em;
  transition: all 0.15s ease;
  background-color: ${(props) =>
    (props.color === "green" && "#3ECF8E") ||
    (props.color === "danger" && "red")};
  color: white;
  cursor: pointer;
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
  }
`;

const ButtonContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  .icon {
    font-size: 150%;
    margin-right: 15px;
  }
`;

function LanderyButton({ buttonStyle = "", children, ...props }) {
  switch (buttonStyle) {
    case "intense":
      return <IntenseButton {...props}>{children}</IntenseButton>;
    case "simple":
      return <SimpleButton {...props}>{children}</SimpleButton>;
    default:
      return (
        <StyledButton {...props}>
          <ButtonContent>{children}</ButtonContent>
        </StyledButton>
      );
  }
}

export default LanderyButton;
