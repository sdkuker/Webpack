import * as React from 'react';
import './Map.css';

class Map extends React.Component {

  render() {
    return (
      <svg width={window.innerWidth} height={window.innerHeight} >
        <g>
          <title>North Atlantic Ocean</title>
          <polygon
              className="w" 
              points="70,261 64,250 67,242 71,245 81,234 74,228 80,225 78,218 
                82,217 89,220 94,220 95,218 94,216 97,216 101,212 110,212 119,217 120,227 
                130,227 130,223 138,217 138,214 130,208 129,197 139,189 140,182 148,177 
                148,0 0,0 0,273 58,273" 
          />
          <text x="65" y="120">NAO</text>
        </g>
        <g>
          <title>Irish Sea</title>
          <polygon
              className="w" 
              points="100,291 112,287 122,281 130,282 127,276 119,272 116,272 115,265 128,262 
                126,256 121,257 132,250 135,250 139,240 136,229 130,227 120,227 110,232 
                109,246 98,259 87,257 70,261 58,273 88,303" 
          />
          <text x="95" y="270">Irish</text>
        </g>
        <g>
          <title>Norwegian Sea</title>
          <polygon
              className="w" 
              points="362,33 357,39 343,44 324,54 320,64 310,75 309,84 
                303,86 292,111 277,132 269,134 264,142 258,141 236,154 198,154 171,181 171,197 
                158,193 152,194 154,188 161,185 162,181 148,177 148,0 362,0" 
          />
          <text x="220" y="70">NWG</text>
        </g>
        <g>
          <title>North Sea</title>
          <path
              className="w" 
              d="M171,197 L171,181 A27,27 0,0,1 198,154 L241,154 L241,224 L248,224 L245,237 
                L211,237 L211,301 L173,301 L165,293 L140,197Z" 
          />
          <text x="190" y="230">NTH</text>
        </g>
      </svg>
    );
  }

}

export default Map;
