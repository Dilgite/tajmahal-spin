import React from 'react'
import { frequencyOfItems, items, tryAgain } from '../helpers/constant'
import { randomNumberGenerate } from '../helpers/utilitiy'
import Lottie from 'lottie-react'
import congratulationAnimation from '../assets/congratulations.lottie.json'
import './index.css'
import logo from '../assets/logo.svg'
export default class Wheel extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedItem: null,
      isSelected: false
    }
    this.selectItem = this.selectItem.bind(this)
  }

  componentDidMount () {
    const reward = localStorage.getItem('reward')
    if (!!reward) {
      this.setState({
        isSelected: true,
        selectedItem: items.findIndex(str => str === reward)
      })
    }
  }

  selectItem () {
    if (this.state.selectedItem === null) {
      const selectedItem = randomNumberGenerate(
        items,
        frequencyOfItems,
        items.length
      )
      if (this.props.onSelectItem) {
        this.props.onSelectItem(selectedItem)
      }
      this.setState({ selectedItem })
      setTimeout(() => {
        localStorage.setItem('reward', items[selectedItem])
        this.setState({ isSelected: true })
      }, 2300)
    } else {
      this.setState({ selectedItem: null })
      setTimeout(this.selectItem, 100)
    }
  }

  render () {
    const { selectedItem, isSelected } = this.state

    const wheelVars = {
      '--nb-item': items.length,
      '--selected-item': selectedItem
    }
    const spinning = selectedItem !== null ? 'spinning' : ''
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: congratulationAnimation,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    }

    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column'
        }}
      >
        <>
          <div className='wheel-container'>
            <div
              className={`wheel ${spinning}`}
              style={wheelVars}
              onClick={!isSelected ? this.selectItem : () => {}}
            >
              {items.map((item, index) => (
                <div
                  className='wheel-item'
                  key={index}
                  style={{ '--item-nb': index }}
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
            <div className='text'>You win {items[selectedItem]}</div>
            <Lottie
              animationData={congratulationAnimation}
              loop={true}
            ></Lottie>
          </>
        )}
        <div
          style={{
            position: 'absolute',
            bottom: '4rem'
          }}
        >
          <img src={logo} alt={'dlg_logo'} />
        </div>
      </div>
    )
  }
}
