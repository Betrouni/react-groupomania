import React from "react";

const OverLay = ({ onClick }) => {
  return (
    <div className="overlay-container">
      <div className="overlay">
        <div className="overlay-panel overlay-left">
          <h1>Heureux de vous retrouver</h1>
          <p>Appuyez pour vous connecter</p>
          <button onClick={onClick} className="btn-overlay" id="signIn">
            Connexion
          </button>
        </div>
        <div className="overlay-panel overlay-right">
          <h1>Bienvenue !</h1>
          <p>Appuyez pour vous inscrire </p>
          <button onClick={onClick} className="btn-overlay" id="signUp">
            Inscription
          </button>
        </div>
      </div>
    </div>
  );
};

export default OverLay;
