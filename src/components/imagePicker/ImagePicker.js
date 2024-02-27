import React, { Component } from 'react'
import ImagePicker from 'react-image-picker'
import 'react-image-picker/dist/index.css'
import { imgarr } from '../../assests/image'

//import images from local


const imageList = imgarr;

class CustomImagePicker extends Component {
    constructor(props) {
        super(props)
        this.state = {
            image: imageList[0]
        }
        this.onPick = this.onPick.bind(this)
    }

    onPick(image) {
        this.setState({ image })
        this.props.setImage(image.value)
    }

    render() {
        return (
            <div>
                <ImagePicker
                    images={imageList.map((image, i) => ({ src: image, value: i }))}
                    onPick={this.onPick}
                />
            </div>
        )
    }
}

export default CustomImagePicker
