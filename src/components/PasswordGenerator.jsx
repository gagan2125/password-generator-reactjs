import React, { useState, useEffect } from "react";

const PasswordGenerator = () => {
  const [password, setPassword] = useState("");
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeLetters, setIncludeLetters] = useState(true);
  const [includeSpecialChars, setIncludeSpecialChars] = useState(true);
  const [lastPasswords, setLastPasswords] = useState([]);

  const generatePassword = () => {
    const numbers = "0123456789";
    const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const specialChars = "!@#$%^&*()_+{}[]|:;\"'<>,.?/~";
    let characters = "";

    if (includeNumbers) characters += numbers;
    if (includeLetters) characters += letters;
    if (includeSpecialChars) characters += specialChars;

    let newPassword = "";
    for (let i = 0; i < 12; i++) {
      newPassword += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    setPassword(newPassword);
    updateLastPasswords(newPassword);
  };
  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    alert("Password copied to clipboard!");
  };

  const handleGeneratePassword = () => {
    generatePassword();
  };
  const updateLastPasswords = (newPassword) => {
    const updatedPasswords = [newPassword, ...lastPasswords.slice(0, 4)];
    setLastPasswords(updatedPasswords);
    localStorage.setItem("lastPasswords", JSON.stringify(updatedPasswords));
  };
  useEffect(() => {
    const lastPasswordsFromStorage = JSON.parse(
      localStorage.getItem("lastPasswords")
    );
    if (lastPasswordsFromStorage) {
      setLastPasswords(lastPasswordsFromStorage);
    }
  }, []);
  return (
    <div className="container">
      <div className="justify-content-center mt-4">
        <h1 className="text-center">Password Generator</h1>
        <div className="mt-4">
          <div className="card-group">
            <div className="card text-bg-light">
              <div className="card-body">
                <h5 className="card-title">Check Requirements</h5>
                <div>
                  <ul className="list-group">
                    <li className="list-group-item">
                      <input
                        className="form-check-input me-1"
                        type="checkbox"
                        value=""
                        checked={includeLetters}
                        id="firstCheckbox"
                        onChange={() => setIncludeLetters(!includeLetters)}
                      />
                      <label className="form-check-label" for="firstCheckbox">
                        Include Letters
                      </label>
                    </li>
                    <li className="list-group-item">
                      <input
                        className="form-check-input me-1"
                        type="checkbox"
                        value=""
                        id="secondCheckbox"
                        checked={includeNumbers}
                        onChange={() => setIncludeNumbers(!includeNumbers)}
                      />
                      <label className="form-check-label" for="secondCheckbox">
                        Include Numbers
                      </label>
                    </li>
                    <li className="list-group-item">
                      <input
                        className="form-check-input me-1"
                        type="checkbox"
                        value=""
                        id="thirdCheckbox"
                        checked={includeSpecialChars}
                        onChange={() =>
                          setIncludeSpecialChars(!includeSpecialChars)
                        }
                      />
                      <label className="form-check-label" for="thirdCheckbox">
                        Inlcude Special Characters
                      </label>
                    </li>
                  </ul>
                  <br />
                  <button
                    onClick={handleGeneratePassword}
                    class="btn btn-primary"
                  >
                    Generate
                  </button>
                </div>
              </div>
              <div className="card-footer">
                <small className="text-body-secondary">
                  Developed by Gagan S K
                </small>
              </div>
            </div>
            <div className="card text-bg-light">
              <div className="card-body">
                <h5 className="card-title">Latest Password</h5>
                {password && (
                  <div className="mx-5">
                    <div className="mt-5 mx-5">
                      <h4 className="card-text">{password}</h4>
                      <button onClick={copyToClipboard} class="btn btn-warning">
                        Copy to Clipboard
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div className="card-footer">
                <small className="text-body-secondary">
                  Developed by Gagan S K
                </small>
              </div>
            </div>
            <div className="card text-bg-light">
              <div className="card-body">
                <h5 className="card-title">Generated Passwords</h5>
                {lastPasswords.length > 0 && (
                  <ul class="list-group">
                    {lastPasswords.map((pw, index) => (
                      <li key={index} class="list-group-item">
                        {pw}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="card-footer">
                <small className="text-body-secondary">
                  Developed by Gagan S K
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;
