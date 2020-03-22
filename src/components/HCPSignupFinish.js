import React from "react";
import Firebase from "firebase";
import * as firebaseui from "firebaseui";
import { withRouter } from "react-router-dom";

class HCPSignupFinish extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        email: '',
        confirmEmail: false,
        dropsite: this.props.match.params.dropsite,
    };
    this.ui = new firebaseui.auth.AuthUI(Firebase.auth());

    this.submitEmail = this.submitEmail.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
  }

  componentDidMount() {
    const shouldConfirm = this.props.backend.shouldRepromptEmail();
    this.setState({ confirmEmail: shouldConfirm });
    if (shouldConfirm === false) {
        this.submitEmail();
    }
  }

  submitEmail(event) {
    if (event) event.preventDefault();
    let url = 'https://help.supply/__/auth/action?apiKey=AIzaSyBtHRUSPc0e4rF057rotTeVpeZ3lDWoQTE&mode=signIn&oobCode=jV_76w1en9UZYiMw4FFcGeJBmfCmACZ9kWn36MHiwyQAAAFw_9p2Ag&continueUrl=https://help.supply/signupFinish/50441&lang=en'
    //window.location.href;
    this.props.backend.continueSignup(url, this.state.confirmEmail ? this.state.email : null)
        .then(() =>  {
            this.props.backend.dropSiteExists(this.state.dropsite).then((exists) => {
              if (exists) {
                let url = "/dropsite/" + this.state.dropsite + "/admin";
                this.props.history.push(url);
              } else {
                let url = "/dropsite/new/admin/" + this.state.dropsite;
                this.props.history.push(url);
              }
            });
        });
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  render() {
    return (
        <div className="">
            <div className="content">
                <div className="panelFull">
                    {this.state.confirmEmail === true ?
                    <form
                        className="linkSubmitGroup"
                        onSubmit={this.submitEmail}
                    >
                        <input
                            className="linkTitle form-control"
                            id="linkTitle"
                            placeholder="Your email, once more"
                            value={this.state.email}
                            onChange={this.handleEmailChange}
                        />
                        <button
                          className="btn btn-primary linkSubmitBtn"
                          onClick={this.submitEmail}
                        >
                          Submit
                        </button>
                    </form>
                    : 
                    <div>Checking against our database...</div>}
                </div>
            </div>
        </div>
    );
  }

}

export default withRouter(HCPSignupFinish);
