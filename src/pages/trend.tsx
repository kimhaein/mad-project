import React, { PureComponent, Fragment } from "react";
import { AuthProvider, AuthConsumer } from "../contexts/authContext";
import HeaderContainer from "../containers/common/HeaderContainer";
import TrendContainer from "../containers/trend/TrendContainer";
import LoadingBar from "../components/common/LoadingBar";
import { LoginModal } from "../components/common/Modal";

interface State {
  isLoading: boolean;
}

class Trend extends PureComponent<{}, State> {
  state: State = {
    isLoading: false
  };

  onLoading = (state = !this.state.isLoading) => {
    this.setState({
      isLoading: state
    });
  };

  render() {
    return (
      <AuthProvider onLoading={this.onLoading}>
        <AuthConsumer>
          {({ state, actions }: any) => (
            <Fragment>
              {this.state.isLoading ? <LoadingBar /> : null}
              <HeaderContainer type="common" state={state} actions={actions} />
              <LoginModal isModal={state.isModal} onModal={actions.onModal} onLogin={actions.onLogin} />
              <TrendContainer onLoading={this.onLoading} />
            </Fragment>
          )}
        </AuthConsumer>
      </AuthProvider>
    );
  }
}

export default Trend;
