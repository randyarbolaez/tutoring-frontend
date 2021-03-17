import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import styled from "styled-components";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const Button = styled.button`
  background: none;
  border: none;
  color: #F8F7FF;
  font-size: 2em;
  outline: none;
  &:hover {
    padding-bottom: 0.5vw;
    cursor:pointer;
    color: #CC5803;
    border-bottom:0.2vw #CC5803 solid;
  }
`;

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor:'#F8F7FF',
    outlineStyle: "none",
    padding: "2% 2% 0 2%",
    display: "flex",
    justifyContent: "center",
    borderRadius: "3%"
  }
}));

const ModalComponent = props => {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button type="button" onClick={handleOpen}>
        {props.buttonName}
      </Button>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          {props.children}
        </div>
      </Modal>
    </div>
  );
};

export default ModalComponent;
