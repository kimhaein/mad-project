import React, { Component } from "react";
import axios from "axios";
import { AuthConsumer } from "../../contexts/authContext";
import Search from "../../components/common/Search";
import Post from "../../components/post";

interface State {
  imgUrl: string;
  hashLank: Array<string>;
}

class PostContainer extends Component<{}, State> {
  state: State = {
    imgUrl: "bg01",
    hashLank: []
  };

  componentDidMount() {
    this.getHashLank();
  }

  //post 데이터 가져오기
  getHashLank = async () => {
    const hashLank = await this.callHashLankApi();
    if (!hashLank) return false;
    this.setState({
      hashLank: hashLank.split(",")
    });
  };

  //API 호출
  callHashLankApi = () => {
    return axios
      .get("https://mad-server.herokuapp.com/api/hash/rank")
      .then(res => {
        return res.data.rankHash[0].rankHash;
      })
      .catch(err => console.log(err));
  };

  onChange = () => {};

  render() {
    const style = { backgroundImage: `url(/static/images/bg06.jpg)` };
    return (
      <AuthConsumer>
        {({ state }: any) => (
          <div className="contentsWrap postWrap" style={style}>
            <Search onChange={this.onChange} tagDatas={this.state.hashLank} />
            <Post postDatas={state.postDatas} />
          </div>
        )}
      </AuthConsumer>
    );
  }
}

export default PostContainer;
