import React from "react";
import { Link } from "react-router-dom";
import styles from "./loginPageOne.module.css";

/* ---------------------------------------------------
   Shared submit handler (for now)
--------------------------------------------------- */
const handleSubmit = (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  console.log("Login success:", Object.fromEntries(formData));
};

/* ===================================================
   LOGIN PAGE ONE
=================================================== */
export function LoginPageOne() {
  return (
    <div className={styles.pageOne}>
      <div className={styles.cardOne}>
        <div className={styles.logoOne}>🔒</div>

        <h3>Sign in</h3>
        <p className={styles.subText}>Welcome back! Please login below.</p>

        <form className={styles.formOne} onSubmit={handleSubmit}>
          <input name="username" placeholder="Username" required />

          <input
            name="password"
            type="password"
            placeholder="Password"
            required
          />

          <div className={styles.optionsOne}>
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <Link to="/forgot-password">Forgot password?</Link>
          </div>

          <button type="submit">Log in</button>
        </form>

        <div className={styles.registerOne}>
          <span>Don't have an account?</span>{" "}
          <Link to="/register">Sign up now</Link>
        </div>
      </div>
    </div>
  );
}

/* ===================================================
   LOGIN PAGE TWO
=================================================== */
export function LoginPageTwo() {
  return (
    <div className={styles.pageTwo}>
      <div className={styles.leftTwo}>
        <h1>🚀 Welcome Back!</h1>
        <p>Manage your dashboard with ease.</p>
      </div>

      <div className={styles.rightTwo}>
        <div className={styles.formBoxTwo}>
          <h3>Sign in</h3>

          <form onSubmit={handleSubmit}>
            <input name="username" placeholder="Username" required />
            <input
              name="password"
              type="password"
              placeholder="Password"
              required
            />

            <div className={styles.optionsTwo}>
              <label>
                <input type="checkbox" /> Remember me
              </label>
              <Link to="/forgot-password">Forgot?</Link>
            </div>

            <button type="submit">Log in</button>
          </form>
        </div>
      </div>
    </div>
  );
}

/* ===================================================
   LOGIN PAGE THREE (Glass UI)
=================================================== */
export function LoginPageThree() {
  return (
    <div className={styles.pageThree}>
      <div className={styles.glassCard}>
        <h3>Sign in</h3>

        <form onSubmit={handleSubmit}>
          <input name="username" placeholder="Username" required />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
          />

          <div className={styles.optionsThree}>
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <Link to="/forgot-password">Forgot?</Link>
          </div>

          <button type="submit">Log in</button>
        </form>
      </div>
    </div>
  );
}

/* ===================================================
   LOGIN PAGE FOUR (Inline)
=================================================== */
export function LoginPageFour() {
  return (
    <div className={styles.pageFour}>
      <h1>🔑 Login</h1>

      <form className={styles.formFour} onSubmit={handleSubmit}>
        <input name="username" placeholder="Username" required />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
        />
        <button type="submit">Go</button>
      </form>
    </div>
  );
}

/* ===================================================
   LOGIN PAGE FIVE (Hero Split)
=================================================== */
export function LoginPageFive() {
  return (
    <div className={styles.pageFive}>
      <div className={styles.heroLeft}>
        <h1>🌟 YourApp</h1>
        <p>Next-gen management system</p>
      </div>

      <div className={styles.heroRight}>
        <div className={styles.formBoxFive}>
          <h3>Login</h3>

          <form onSubmit={handleSubmit}>
            <input name="username" placeholder="Username" required />
            <input
              name="password"
              type="password"
              placeholder="Password"
              required
            />
            <button type="submit">Log in</button>
          </form>
        </div>
      </div>
    </div>
  );
}
