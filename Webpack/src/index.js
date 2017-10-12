import _ from 'lodash';
import './style.css';
import CruisePicture from './cruisePicture.jpg';

function component() {
    var element = document.createElement('div');

    // Lodash now imported by this script
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.classList.add('hello');

    // add the picture to the existing div
    var myCruisePicture = new Image();
    myCruisePicture.src = CruisePicture;

    element.appendChild(myCruisePicture);

    return element;
}

document.body.appendChild(component());