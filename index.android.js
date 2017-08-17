<script src="http://localhost:8097" />;

import React, { Component } from "react";
import {
  AppRegistry,
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  FlatList,
  SectionList,
  h1,
  Button,
  ImageBackground,
  Animated,
  NativeModules,
  TouchableHighlight,
  DeviceEventEmitter
} from "react-native";
import { StackNavigator } from "react-navigation";

import styles from "./app/Styles/Main";
import MoveList from "./app/Compoents/MoveList";
import FadeInView from "./app/Compoents/FadeView";

import ToastExample from "./app/Compoents/ToastExample";

class PizzaTranslator extends Component {
  constructor(props) {
    console.log("dsddssdd");

    super(props);
    this.state = { text: "" };
  }

  componentDidMount() {
    console.log("dsddssdd");
    this.getMoviesFromApiAsync();
  }

  getMoviesFromApiAsync() {
    return fetch("https://facebook.github.io/react-native/movies.json")
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        return responseJson.movies;
      })
      
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    return (
      <View>
        <FlatList
          data={[
            { key: "Desssssvin" },
            { key: "Jackson" },
            { key: "James" },
            { key: "Joel" },
            { key: "John" },
            { key: "Jillian" },
            { key: "Jimmy" },
            { key: "Julie" }
          ]}
          renderItem={({ item }) =>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <Text>
                {item.key}
              </Text>
            </View>}
        />
        <SectionList
          backgroundColor="powderblue"
          sections={[
            { title: "D", data: ["Devin"] },
            {
              title: "J",
              data: [
                "Jackson",
                "James",
                "Jillian",
                "Jimmy",
                "Joel",
                "John",
                "Julie"
              ]
            }
          ]}
          renderItem={({ item }) =>
            <Text style={styles.item}>
              {item}
            </Text>}
          renderSectionHeader={({ section }) =>
            <Text style={styles.sectionHeader}>
              {section.title}
            </Text>}
        />
        <TextInput
          style={{ height: 40 }}
          placeholder="Type here to translate!"
          onChangeText={text => this.setState({ text })}
        />
        <Text style={{ padding: 10, fontSize: 42 }}>
          {this.state.text.split(" ").map(word => word && "🍕").join(" ")}
        </Text>
        <ScrollView>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text>Scroll</Text>
            <Image
              style={{
                width: 200,
                height: 200,
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
              }}
              source={require("./img/cry.png")}
            />
            <Text style={{ fontSize: 96 }}>Scroll</Text>
            <Image source={require("./img/cry.png")} />
            <Text style={{ fontSize: 96 }}>Scroll</Text>
            <Image source={require("./img/cry.png")} />
            <Text style={{ fontSize: 96 }}>Scroll</Text>
            <Image source={require("./img/cry.png")} />
            <Text style={{ fontSize: 96 }}>Scroll</Text>
            <Image source={require("./img/cry.png")} />
            <Text style={{ fontSize: 96 }}>Scroll</Text>
            <Image source={require("./img/cry.png")} />
            <Text style={{ fontSize: 96 }}>Scroll</Text>
            <Image source={require("./img/cry.png")} />
            <Image source={require("./img/cry.png")} />
            <Image source={require("./img/cry.png")} />
            <Image source={require("./img/cry.png")} />
            <Image source={require("./img/cry.png")} />
            <Image source={require("./img/cry.png")} />
          </View>
        </ScrollView>
      </View>
    );
  }
}

class AwesomeProject extends Component {
  render() {
    return <MoveList />;
  }
}

class Greeting extends Component {
  render() {
    return (
      <Text>
        Hello {this.props.name}!
      </Text>
    );
  }
}

/************************************StackNavigator:开始************************************************************************/
class HomeScreen extends Component {
  static navigationOptions = {
    title: "Welcome"
  };

  componentWillMount() {
    DeviceEventEmitter.addListener("eventName", function(e) {
      //todo 能从Android端得到相应，不能得到参数，待研究
      alert(e);
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      //flexDirection可以决定布局的主轴。子元素是应该沿着水平轴(row)方向排列，还是沿着竖直轴(column)方向
      //justifyContent可以决定其子元素沿着主轴的排列方式。flex-start、center、flex-end、space-around以及space-between。
      //alignItems可以决定其子元素沿着次轴（与主轴垂直的轴，比如若主轴方向为row，则次轴方向为column）的排列方式。：flex-start、center、flex-end以及stretch。
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <Button
          title="调用Android原生Toast"
          onPress={() => ToastExample.show("Awesome", ToastExample.SHORT)}
        />

        <TouchableHighlight
          activeOpacity={0.5}
          underlayColor="#fc3b4e"
          onPress={() =>
            NativeModules.ZanIntentModule.startActivity(
              "com.awesomeproject.callbackdemo.CallbackActivity",
              { key: "lxh" }
            )}
        >
          <Text>React和Android交互1--->调到指定Activity</Text>
        </TouchableHighlight>

        <TouchableHighlight
          activeOpacity={0.5}
          underlayColor="#fc3b4e"
          onPress={() =>
            NativeModules.ZanIntentModule.login(
              "lxh",
              "123123",
              name => {
                alert(name);
              },
              error => {
                alert(error);
              }
            )}
        >
          <Text>React和Android交互2---->回调</Text>
        </TouchableHighlight>

        <TouchableHighlight
          activeOpacity={0.5}
          underlayColor="#fc3b4e"
          onPress={() =>
            NativeModules.ZanIntentModule
              .login2("", "123123")
              .then(map => {
                alert(map.name);
              })
              .catch(e => {
                /************和官网的例子有出入，e.code   e.message */
                alert("code-->" + e.code + "--msg-->" + e.message);
              })}
        >
          <Text>React和Android交互4---->回调</Text>
        </TouchableHighlight>

        <Image
          source={require("./img/cry.png")}
          style={{ width: 40, height: 40 }}
        />
        <Image
          source={{
            uri: "https://facebook.github.io/react/img/logo_og.png",
            method: "POST",
            headers: {
              Pragma: "no-cache"
            },
            body: "Your Body goes here"
          }}
          style={{ width: 40, height: 40 }}
        />
        <Image
          source={{ uri: "https://facebook.github.io/react/img/logo_og.png" }}
          style={{ width: 40, height: 40 }}
        />
        <ImageBackground source={require("./img/cry.png")}>
          <Text
            style={{
              width: 90,
              height: 40,
              textAlign: "center",
              backgroundColor: "#fc4b4e"
            }}
          >
            Inside
          </Text>
        </ImageBackground>

        <FadeInView
          style={{ width: 250, height: 50, backgroundColor: "#fc4b4e" }}
        >
          <Text style={{ fontSize: 28, textAlign: "center", margin: 10 }}>
            Fading in
          </Text>
        </FadeInView>

        <View style={{ width: 50, height: 50, backgroundColor: "skyblue" }} />
        <View style={{ width: 50, height: 50, backgroundColor: "steelblue" }} />
        <Button
          title="Go to Jane's profile"
          onPress={() => navigate("Profile", { user: "jane" })}
        />
      </View>
    );
  }
}
class ProfileScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    //  ``````  不是‘’‘’‘’‘’‘冒号
    title: `Chat with ${navigation.state.params.user}`
  });

  render() {
    const { params } = this.props.navigation.state;
    return (
      <View>
        <Button title="this Jane's home" />
        <Text
          style={{
            backgroundColor: "#fadaea",
            textAlign: "center",
            alignItems: "stretch"
          }}
        >
          Chat with {params.user}
        </Text>
        <Text
          style={{
            backgroundColor: "#fc4b4e",
            textAlign: "center",
            padding: 10
          }}
        >
          Chat with {params.user}
        </Text>
      </View>
    );
  }
}
const NavigatorSample = StackNavigator({
  Home: { screen: HomeScreen },
  Profile: { screen: ProfileScreen }
});
/************************************StackNavigator:结束************************************************************************/

// AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
AppRegistry.registerComponent("AwesomeProject", () => NavigatorSample);
// AppRegistry.registerComponent('AwesomeProject', () => PizzaTranslator);
