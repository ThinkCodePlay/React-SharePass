import { useEffect, useState } from "react";
// import jwt from "jsonwebtoken";
// const jwt = require("jsonwebtoken")
const sign = require("jwt-encode");

const Encrypt = () => {
  const [enterdPassword, setEnterdPassword] = useState("");
  const [enterdPassphrase, setEnterdPassphrase] = useState("");
  const [hasSubmited, setHasSubmited] = useState(false);
  const [token, setToken] = useState("");

  const [enterdPasswordValid, setEnterdPasswordValid] = useState(true);
  const [enterdPassphraseValid, setEnterdPassphraseValid] = useState(true);
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    if (enterdPassword && enterdPassphrase) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [enterdPassword, enterdPassphrase]);

  const passwordInputChangeHandler = (event: any) => {
    setEnterdPassword(event.currentTarget.value);
  };
  const passphraseInputChangeHandler = (event: any) => {
    setEnterdPassphrase(event.currentTarget.value);
  };

  const encodePassword = (password: string, phrase: string): string => {
    const token = sign({ password }, phrase);
    return token;
  };

  const resetState = () => {
    setEnterdPassphraseValid(true);
    setHasSubmited(false);
  };

  const checkFormIsValid = () => {
    let valid = true;
    if (!enterdPassword) {
      setEnterdPasswordValid(false);
      valid = false;
    }
    if (!enterdPassphrase) {
      setEnterdPassphraseValid(false);
      valid = false;
    }

    return valid;
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    resetState();
    const formValid = checkFormIsValid();
    if (!formValid) {
      return;
    }

    setToken(encodePassword(enterdPassword, enterdPassphrase));
    setHasSubmited(true);
  };

  const cssInputValid = (valid: boolean) => {
    return valid ? "form-control" : "form-control is-invalid";
  };
  const cssPassword = cssInputValid(enterdPasswordValid);
  const cssPassphrase = cssInputValid(enterdPassphraseValid);

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="row mt-3">
          <div className="form-group">
            <label htmlFor="passwordInput">Enter Password here</label>
            <input
              type="text"
              className={cssPassword}
              id="passwordInput"
              aria-describedby="password-help"
              placeholder="Enter Password"
              onChange={passwordInputChangeHandler}
            />
            <small id="password-help" className="form-text text-muted">
              You data is not stored anywhere!
            </small>
            {!enterdPasswordValid && (
              <div className="alert alert-warning">
                Password must not be empty
              </div>
            )}
          </div>
        </div>
        <div className="row mt-3">
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Passphrase</label>
            <input
              type="password"
              className={cssPassphrase}
              id="exampleInputPassword1"
              placeholder="Password"
              onChange={passphraseInputChangeHandler}
            />
            {!enterdPassphraseValid && (
              <div className="alert alert-warning">Must enter passphrase</div>
            )}
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-sm-2">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!formIsValid}
            >
              Encrypt
            </button>
          </div>
        </div>
      </form>

      {hasSubmited && (
        <div className="mt-3 card">
          <div className="card-header">Encrypted Password:</div>
          <div className="card-body">{token}</div>
        </div>
      )}
    </div>
  );
};

export default Encrypt;
