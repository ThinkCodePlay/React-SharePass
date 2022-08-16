import { useState } from "react";
import { useParams } from "react-router-dom";
import useInput from "../hooks/user-input";
const CryptoJS = require("crypto-js");

const Encrypt = () => {
  let { password } = useParams();

  const {
    value: enterdPassword,
    hasError: enterdPasswordHasError,
    valueChangeHandler: passwordInputChangeHandler,
  } = useInput((value: any) => value !== "", password as string);

  const {
    value: enterdPassphrase,
    hasError: enterdPassphraseHasError,
    valueChangeHandler: passphraseInputChangeHandler,
  } = useInput((value: any) => value !== "", "");

  const [hasSubmited, setHasSubmited] = useState(false);
  const [token, setToken] = useState("");

  const formIsValid = enterdPassword && enterdPassphrase;

  const decodePassword = (ciphertext: string, phrase: string): string => {
    var bytes = CryptoJS.AES.decrypt(ciphertext, phrase);
    var originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
  };

  const resetState = () => {
    setHasSubmited(false);
  };

  const checkFormIsValid = () => {
    let valid = true;

    if (!enterdPassword) {
      valid = false;
    }
    if (!enterdPassphrase) {
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

    setToken(decodePassword(enterdPassword, enterdPassphrase));
    setHasSubmited(true);
  };

  const cssInputValid = (valid: boolean) => {
    return valid ? "form-control is-invalid" : "form-control";
  };
  const cssPassword = cssInputValid(enterdPasswordHasError);
  const cssPassphrase = cssInputValid(enterdPassphraseHasError);

  return (
    <div className="container">
      <h2>Decrypt Your Password</h2>
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
              value={enterdPassword}
            />
            <small id="password-help" className="form-text text-muted">
              You data is not stored anywhere!
            </small>
            {enterdPasswordHasError && (
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
            {enterdPassphraseHasError && (
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
              <i className="bi bi-unlock"></i>
              Decrypt
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
