import Lottie from "lottie-react";
import React from "react";
import congratulationAnimation from "../assets/congratulations.lottie.json";
import logo from "../assets/logo.svg";
import { frequencyOfItems, items } from "../helpers/constant";
import {
  capitalizeFirstLetters,
  randomNumberGenerate,
} from "../helpers/utilitiy";
import CrowdCheerAudio from "./CrowdCheerAudio";
import SpinningAudio from "./SpinningAudio";
import "./index.css";
export default class Wheel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: null,
      isSelected: false,
    };
    this.selectItem = this.selectItem.bind(this);
    this.spinAudioRef = React.createRef();
    this.spinAudioFile = "./sppinning-sound.mp3";
    this.crowdCheeerAudioRef = React.createRef();
    this.crowdCheeerAudioFile = "./crowd-cheering.mp3";
  }

  componentDidMount() {
    const reward = localStorage.getItem("reward");
    if (!!reward) {
      this.setState({
        isSelected: true,
        selectedItem: items.findIndex((str) => str === reward),
      });
    }
  }

  selectItem() {
    if (this.state.selectedItem === null) {
      this.playSpinAudio();
      const selectedItem = randomNumberGenerate(
        items,
        frequencyOfItems,
        items.length
      );
      if (this.props.onSelectItem) {
        this.props.onSelectItem(selectedItem);
      }
      this.setState({ selectedItem });
      setTimeout(() => {
        localStorage.setItem("reward", items[selectedItem]);
        this.setState({ isSelected: true });
        this.playCrowdCheerAudio();
      }, 2300);
    } else {
      this.setState({ selectedItem: null });
      setTimeout(this.selectItem, 100);
    }
  }

  playSpinAudio = () => {
    const audio = this.spinAudioRef.current;

    audio.play();
  };

  playCrowdCheerAudio = () => {
    const spinAudio = this.spinAudioRef.current;
    spinAudio.pause();
    const crowCheerAudio = this.crowdCheeerAudioRef.current;
    crowCheerAudio.play();
  };

  render() {
    const { selectedItem, isSelected } = this.state;

    const wheelVars = {
      "--nb-item": items.length,
      "--selected-item": selectedItem,
    };
    const spinning = selectedItem !== null ? "spinning" : "";
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: congratulationAnimation,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    };

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <>
          <div className="wheel-container">
            <div
              className={`wheel ${spinning}`}
              style={wheelVars}
              onClick={!isSelected ? this.selectItem : () => {}}
            >
              {capitalizeFirstLetters(items).map((item, index) => (
                <div
                  className={`wheel-item ${
                    item.toLowerCase() === "chicken tikka starter"
                      ? item.toLowerCase().split(" ").join("-")
                      : ""
                  }`}
                  id={
                    isSelected && selectedItem === index
                      ? "selected-wheel-item"
                      : ""
                  }
                  key={index}
                  style={{
                    "--item-nb": index,
                  }}
                  title={item}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </>
        {isSelected && (
          <>
            {/* <div className='button_primary'>Claim Reward</div>; */}
            <div className="text">
              You win{" "}
              <span className="highlighted-text">{items[selectedItem]}</span>
            </div>
            <Lottie
              animationData={congratulationAnimation}
              loop={true}
            ></Lottie>
          </>
        )}
        <div className="logo-container">
          <img className="logo" src={logo} alt={"dlg_logo"} />
        </div>

        {/* Add spin audio */}
        <SpinningAudio
          audioFile={this.spinAudioFile}
          audioRef={this.spinAudioRef}
        />

        {/* Add crowd cheer audio */}
        <CrowdCheerAudio
          audioFile={this.crowdCheeerAudioFile}
          audioRef={this.crowdCheeerAudioRef}
        />
      </div>
    );
  }
}
