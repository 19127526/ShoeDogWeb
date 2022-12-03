const LoginPage = () => {
  return (
    <>
      <div className="auth">
        <div className="auth-container">
          <div className="card">
            <header className="auth-header">
              <h1 className="auth-title">
                <div className="logo">
                  <span className="l l1"></span>
                  <span className="l l2"></span>
                  <span className="l l3"></span>
                  <span className="l l4"></span>
                  <span className="l l5"></span>
                </div>
                ModularAdmin
              </h1>
            </header>
            <div className="auth-content">
              <p className="text-center">LOGIN TO CONTINUE</p>
              <form id="login-form" action="https://modularcode.io/index.html" method="GET" noValidate="">
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input type="email" className="form-control underlined" name="username" id="username"
                         placeholder="Your email address" required/></div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input type="password" className="form-control underlined" name="password" id="password"
                         placeholder="Your password" required/></div>
                <div className="form-group">
                  <label htmlFor="remember">
                    <input className="checkbox" id="remember" type="checkbox"/>
                      <span>Remember me</span>
                  </label>
                  <a href="reset.html" className="forgot-btn pull-right">Forgot password?</a>
                </div>
                <div className="form-group">
                  <button type="submit" className="btn btn-block btn-primary">Login</button>
                </div>
                <div className="form-group">
                  <p className="text-muted text-center">Do not have an account?
                    <a href="signup.html">Sign Up!</a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="ref" id="ref">
        <div className="color-primary"></div>
        <div className="chart">
          <div className="color-primary"></div>
          <div className="color-secondary"></div>
        </div>
      </div>

    </>
)
}

export default LoginPage