import * as React from 'react';
import '../map.css';
import MapBuilder from './MapBuilder';

export class Map extends React.Component {

  render() {
    return ( // 610 560  915 840
      <svg viewBox="0 0 610 560">
        <g>
          <title>North_Atlantic_Ocean</title>
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
          <title>Irish_Sea</title>
          <polygon
              className="w" 
              points="100,291 112,287 122,281 130,282 127,276 119,272 116,272 115,265 128,262 
                126,256 121,257 132,250 135,250 139,240 136,229 130,227 120,227 110,232 
                109,246 98,259 87,257 70,261 58,273 88,303" 
          />
          <text x="95" y="270">Irish</text>
        </g>
        <g>
          <title>English_Channel</title>
          <polygon
              className="w" 
              points="173,301 169,311 153,315 155,320 150,319 144,318 142,312 136,310 
                136,326 124,323 122,318 102,317 88,303 100,291 110,292 120,295 124,291 
                134,294 147,295 160,298 168,296" 
          />
          <text x="135" y="306">ENG</text>
        </g>
        <g>
          <title>Norwegian_Sea</title>
          <polygon
              className="w" 
              points="362,33 357,39 343,44 324,54 320,64 310,75 309,84 
                303,86 292,111 277,132 269,134 264,142 258,141 236,154 198,154 171,181 171,197 
                158,193 152,194 154,188 161,185 162,181 148,177 148,0 362,0" 
          />
          <text x="220" y="70">NWG</text>
        </g>
        <g>
          <title>Barents_Sea</title>
          <polygon
              className="w" 
              points="540 0 535,9 530,6 517,19 516,33 513,38 513,23 507,20 505,26 499,33 
              492,48 495,58 488,60 479,57 477,55 481,50 473,43 466,45 472,62 478,66 478,74 
              472,72 468,74 457,91 469,100 467,106 462,109 444,101 442,110 447,115 454,119 
              452,122 434,118 426,103 426,94 414,88 412,83 445,84 457,79 459,66 453,61 
              417,47 405,49 401,45 397,48 391,47 395,41 394,38 384,33 382,40
              380,33 377,31 374,38 371,33 366,42 366,33 362,33 362,0" 
          />
          <text x="440" y="15">BAR</text>
        </g>
        <g>
          <title>North_Sea</title>
          <path
              className="w" 
              d="M171,197 L171,181 A27,27 0,0,1 198,154 L241,154 L241,224 L248,224 L245,237 
                L211,237 L211,301 L173,301 L165,293 L140,197Z" 
          />
          <text x="190" y="230">NTH</text>
        </g>
        <g>
          <title>Heloland_Bight</title>
          <polygon
              className="w" 
              points="245,237 243,247 244,254 243,257 245,263 244,270 244,273 235,277 
              234,274 230,273 226,275 211,274 211,237" 
          />
          <text x="220" y="265">HEL</text>
        </g>
        <g>
          <title>Skagerrak</title>
          <polygon
              className="w" 
              points="241,209 246,210 266,201 270,193 275,203 277,218 276,224 282,236 
              279,240 279,243 275,242 269,243 266,240 267,234 266,221 263,223 248,224 
              241,224" 
          />
          <text x="255" y="220">Ska</text>
        </g>
        <g>
          <title>Baltic_Sea</title>
          <polygon
              className="w" 
              points="266,255 271,260 278,254 277,250 280,248 279,243 282,253 289,254 
              294,245 305,244 312,229 311,220 359,220 349,229 347,243 347,248 348,254 
              344,262 337,264 334,273 328,274 326,265 314,266 307,273 294,275 286,274 
              287,267 280,266 266,275 261,274 260,269 256,266 256,263 254,255" 
          />
          <text x="308" y="260">BAL</text>
        </g>
        <g>
          <title>Gulf_of_Bothnia</title>
          <polygon
              className="w" 
              points="311,220 314,209 322,206 328,203 331,193 326,183 320,182 321,161 
              330,146 343,138 351,128 347,121 349,112 355,104 362,107 368,108 372,120 
              366,121 359,136 345,151 347,160 350,165 348,178 349,184 357,186 365,191 
              384,185 402,177 403,183 411,184 414,187 408,187 400,192 399,197 387,196 
              371,198 369,202 365,204 368,210 372,213 373,221 377,227 373,229 366,228 
              359,220 "
          />
          <text x="332" y="210">BOT</text>
        </g>
        <g>
          <title>Mid_Atlantic_Ocean</title>
          <polygon
              className="w" 
              points="102,317 100,322 103,328 109,329 123,344 122,350 123,357 128,363 
              121,382 122,384 112,399 101,396 96,397 72,384 59,381 54,375 48,374 46,378 
              39,375 33,381 35,384 32,396 30,406 17,427 14,427 10,433 13,440 15,441 
              12,450 13,454 8,462 19,469 27,468 33,475 34,484 37,490 37,495 33,496 17,518 
              0,520 0,273 58,273"
          />
          <text x="50" y="355">MAO</text>
        </g>
        <g>
          <title>Western_Mediterranean</title>
          <polygon
              className="w" 
              points="37,490 47,488 52,489 60,486 78,491 83,494 86,485 90,483 98,484 
              107,474 113,473 115,469 142,469 150,471 154,466 205,466 206,476 204,485 
              208,492 212,492 217,489 218,490 218,516 212,517 208,521 203,520 179,515 
              169,518 150,511 117,509 106,511 99,515 89,512 84,518 79,520 68,516 68,511 
              64,514 46,509 42,502 41,494 37,495"
          />
          <text x="160" y="491">WES</text>
        </g>
        <g>
          <title>Gulf_of_Lyon</title>
          <polygon
              className="w" 
              points="115,469 110,461 124,444 131,439 146,438 157,432 158,425 158,418 
              169,412 176,417 188,422 198,421 211,416 222,410 233,415 238,431 224,431 
              221,434 211,436 213,451 218,454 218,458 214,461 206,462 205,466 154,466 
              148,463 142,469"
          />
          <text x="170" y="457">LYO</text>
        </g>
        <g>
          <title>Tyrrhenian_Sea</title>
          <polygon
              className="w" 
              points="238,431 247,442 248,447 256,458 271,464 276,474 290,487 294,502 
              289,511 285,511 285,508 276,510 263,510 257,507 252,508 247,513 236,524 
              233,523 224,527 223,518 218,516 218,490 220,490 224,468 222,458 218,458 
              218,454 223,450 225,444 225,436 224,431"
          />
          <text x="245" y="495">TYS</text>
        </g>
        <g>
          <title>Ionian_Sea</title>
          <polygon
              className="w" 
              points="289,511 290,514 295,515 308,500 311,491 304,484 310,480 318,485 
              322,485 322,480 335,480 339,487 346,498 350,498 347,500 352,508 367,507 
              371,511 355,510 350,514 357,521 359,533 360,528 367,536 368,531 376,537 
              383,544 380,547 383,550 400,554 400,559 232,559 234,551 232,544 225,535 
              231,531 236,524 247,513 258,519 273,531 281,532 282,521 285,513 285,511"
          />
          <text x="315" y="520">ION</text>
        </g>
        <g>
          <title>Adriatic_Sea</title>
          <polygon
              className="w" 
              points="322,480 297,456 300,453 290,453 278,443 272,424 260,417 261,401 
              270,398 276,399 275,403 278,410 282,401 286,402 289,418 306,436 331,454 
              331,477 335,480"
          />
          <text x="308" y="460">ADR</text>
        </g>
        <g>
          <title>Aegean_Sea</title>
          <polygon
              className="w" 
              points="376,537 371,520 378,521 377,513 386,516 385,509 370,494 371,491 
              378,494 368,483 371,477 379,484 382,483 381,477 386,478 380,472 392,472 
              400,468 408,470 410,473 414,475 410,482 409,487 417,486 417,489 420,495 
              417,498 417,507 423,510 427,524 435,523 435,530 416,549 412,547 387,546 
              383,544"
          />
          <text x="380" y="500">AEG</text>
        </g>
        <g>
          <title>Eastern_Mediterranean</title>
          <polygon
              className="w" 
              points="435,530 441,526 447,528 453,534 464,531 466,521 475,520 485,528 
              491,530 505,526 511,514 520,517 527,508 530,509 525,518 526,530 532,535 
              528,559 400,559 400,554 414,552 416,549"
          />
          <text x="455" y="550">EAS</text>
        </g>
        <g>
          <title>Black_Sea</title>
          <polygon
              className="w" 
              points="440,458 430,455 426,450 422,441 425,427 429,426 430,423 432,409 
              439,404 438,397 446,378 459,375 461,377 459,379 465,383 476,381 478,383 
              472,385 468,392 477,396 477,401 486,404 488,397 494,396 497,392 507,389 
              506,384 494,387 485,378 503,364 526,351 527,354 514,365 517,371 520,371 
              515,384 511,383 510,386 517,393 528,394 554,406 567,408 573,417 570,427 
              555,438 551,437 520,441 514,438 511,440 502,433 481,438 470,447 464,457 
              442,460"
          />
          <text x="500" y="418">BLA</text>
        </g>
        <g>
          <title>Clyde</title>
          <polygon
              className="l" 
              points="138,214 130,208 129,197 139,189 140,182 148,177 162,181 161,185 
              154,188 152,194 146,200 144,213"
          />
          <text x="133" y="201">Cly</text>
        </g>
        <g>
          <title>Liverpool</title>
          <polygon
              className="l" 
              points="128,262 126,256 121,257 132,250 135,250 139,240 136,229 130,227 
              130,223 138,217 138,214 144,213 145,217 155,228 155,239 151,248 150,264 
              143,262"
          />
          <text x="138" y="230">Lvp</text>
        </g>
        <g>
        <title>Edinburgh</title>
          <polygon
              className="l" 
              points="152,194 158,193 171,197 170,202 165,210 158,214 151,215 157,216 
              161,218 163,226 155,228 145,217 144,213 146,200"
          />
          <text x="152" y="202">Edi</text>
        </g>
        <g>
        <title>Yorkshire</title>
          <polygon
              className="l" 
              points="163,226 163,239 168,246 170,252 169,265 166,269 153,271 150,264 
              151,248 155,239 155,228"
          />
          <text x="155" y="254">Yor</text>
        </g>
        <g>
        <title>Wales</title>
          <polygon
              className="l" 
              points="100,291 112,287 122,281 130,282 127,276 119,272 116,272 115,265 
              128,262 143,262 150,264 153,271 150,277 145,281 147,295 134,294 124,291 
              120,295 110,292"
          />
          <text x="130" y="275">Wal</text>
        </g>
        <g>
        <title>London</title>
          <polygon
              className="l" 
              points="166,269 168,270 171,268 177,270 178,274 176,283 165,293 172,294 
              168,296 160,298 147,295 145,281 150,277 153,271"
          />
          <text x="160" y="280">Lon</text>
        </g>
        <g>
        <title>Switzerland</title>
          <polygon
              className="s" 
              points="209,363 208,367 194,382 197,385 203,379 207,386 213,387 
              221,385 227,390 229,385 243,388 245,384 241,378 234,374 234,366 
              232,363 225,362 222,365"
          />
          <text x="206" y="381">Swi</text>
        </g>
        <g>
        <title>Albania</title>
          <polygon
              className="l" 
              points="331,454 331,477 335,480 339,487 350,477 350,471 346,466 
              346,452 337,446 330,445"
          />
          <text x="333" y="460">Alb</text>
        </g>
        <g>
        <title>Ankara</title>
          <polygon
              className="l" 
              points="555,438 551,437 520,441 514,438 511,440 502,433 481,438 
              470,447 464,457 468,461 468,479 466,491 473,491 490,480 501,482 
              508,480 531,460 546,462 555,460 557,449"
          />
          <text x="510" y="455">Ank</text>
        </g>
        <g>
        <title>Apulia</title>
          <polygon
              className="l" 
              points="304,484 310,480 318,485 322,485 322,480 297,456 300,453 
              290,453 278,443 274,447 279,451 280,455 279,458 293,481"
          />
          <text x="291" y="470">Apu</text>
        </g>
        <g>
        <title>Armenia</title>
          <polygon
              className="l" 
              points="609,493 584,478 563,479 562,471 556,467 555,460 557,449 
              555,438 570,427 589,442 594,439 603,441 609,440"
          />
          <text x="585" y="467">Arm</text>
        </g>
        <g>
        <title>Belguim</title>
          <polygon
              className="l" 
              points="191,299 194,303 206,306 205,311 208,315 210,326 205,331 
              192,323 184,315 169,311 173,301"
          />
          <text x="192" y="321">Bel</text>
        </g>
        <g>
        <title>Berlin</title>
          <polygon
              className="l" 
              points="294,275 286,274 287,267 280,266 266,275 266,283 262,287 
              264,293 261,296 263,310 288,305 296,300 297,296 292,290"
          />
          <text x="272" y="292">Ber</text>
        </g>
        <g>
        <title>Bohmeia</title>
          <polygon
              className="l" 
              points="281,356 276,346 268,343 264,329 266,325 278,326 288,321 
              297,322 311,334 314,332 321,339 322,347 316,348 303,346 295,349 292,357"
          />
          <text x="283" y="347">Boh</text>
        </g>
        <g>
        <title>Brest</title>
          <polygon
              className="l" 
              points="150,319 144,318 142,312 136,310 136,326 124,323 122,318 102,317 
              100,322 103,328 109,329 123,344 122,350 123,357 128,363 146,365 146,337 
              148,329"
          />
          <text x="130" y="345">Bre</text>
        </g>
        <g>
        <title>Budapest</title>
          <polygon
              className="l" 
              points="394,376 395,382 401,385 406,396 401,402 387,402 367,406 365,412 
              360,413 342,410 338,412 335,410 332,410 323,408 321,398 311,394 308,383 
              311,375 322,370 335,354 337,350 350,347 360,351 368,353 377,360 378,363 
              384,365"
          />
          <text x="350" y="390">Bud</text>
        </g>
        <g>
        <title>Bulgaria_(ec)</title>
          <polygon
              className="l" 
              points="413,464 412,454 420,451 426,450 422,441 425,427 429,426 430,423 
              422,420 410,420 404,422 398,427 390,425 382,427 375,423 370,425 367,421 
              365,425 368,433 371,438"
          />
          <text x="395" y="443">Bul</text>
        </g>
        <g>
        <title>Bulgaria_(sc)</title>
          <polygon
              className="l" 
              points="371,438 366,439 371,456 365,461 369,464 376,464 388,460 392,472 
              400,468 408,470 413,464 412,454"
          />
        </g>
        <g>
        <title>Burgundy</title>
          <polygon
              className="l" 
              points="192,323 205,331 204,338 211,346 213,352 209,363 208,367 194,382 
              178,381 178,390 173,396 168,395 163,387 165,383 158,380 156,374 165,365 
              185,344 188,332"
          />
          <text x="185" y="371">Bur</text>
        </g>
        <g>
        <title>Constantinople</title>
          <polygon
              className="l" 
              points="408,470 410,473 414,475 410,482 409,487 417,486 417,489 423,487 
              432,493 452,495 466,491 468,479 468,461 464,457 442,460 440,458 430,455 
              426,450 420,451 412,454 413,464"
          />
          <polygon
              className="w" 
              points="414,475 421,467 435,463 440,458 442,460 439,463 448,464 425,475"
          />
          <text x="435" y="483">Con</text>
        </g>
        <g>
        <title>Denmark</title>
          <polygon
              className="l" 
              points="279,243 275,242 269,243 266,240 267,234 266,221 263,223 248,224 
              245,237 243,247 244,254 254,255 266,255 271,260 278,254 277,250 280,248"
          />
          <polygon
              className="w" 
              points="269,243 268,246 263,247 266,255 254,255 257,247 266,240"
          />
          <text x="250" y="235">Den</text>
        </g>
        <g>
        <title>Finland</title>
          <polygon
              className="l" 
              points="362,107 368,108 372,120 366,121 359,136 345,151 347,160 350,165 
              348,178 349,184 357,186 365,191 384,185 402,177 412,161 410,152 414,147 
              410,130 402,118 401,110 392,92 393,73 387,68 388,61 386,58 388,54 379,48 
              370,49 369,61 355,62 346,54 342,61 356,71"
          />
          <text x="375" y="160">Fin</text>
        </g>
        <g>
        <title>Galicia</title>
          <polygon
              className="l" 
              points="333,330 341,330 344,332 353,327 356,323 361,324 367,329 374,327 
              379,324 383,327 385,332 399,338 404,354 403,360 404,371 394,376 384,365 
              378,363 377,360 368,353 360,351 350,347 337,350 329,346 322,347 321,339 
              322,347 321,339 325,340 329,338"
          />
          <text x="355" y="343">Gal</text>
        </g>
        <g>
        <title>Gascony</title>
          <polygon
              className="l" 
              points="128,363 121,382 122,384 112,399 113,407 123,412 134,417 135,414 
              142,417 149,403 157,397 168,395 163,387 165,383 158,380 156,374 149,372 
              146,365"
          />
          <text x="130" y="400">Gas</text>
        </g>
        <g>
        <title>Greece</title>
          <polygon
              className="l" 
              points="339,487 346,498 350,498 347,500 352,508 367,507 371,511 355,510 
              350,514 357,521 359,533 360,528 367,536 368,531 376,537 371,520 378,521 
              377,513 386,516 385,509 370,494 371,491 378,494 368,483 371,477 379,484 
              382,483 381,477 386,478 380,472 392,472 388,460 376,464 369,464 361,467 
              356,471 350,471 350,477"
          />
          <text x="351" y="490">Gre</text>
        </g>
        <g>
        <title>Holland</title>
          <polygon
              className="l" 
              points="226,275 227,280 225,292 220,298 215,297 213,302 210,313 208,315 
              205,311 206,306 194,303 191,299 198,289 205,276 205,279 207,279 211,274"
          />
          <text x="210" y="290">Hol</text>
        </g>
        <g>
        <title>Kiel</title>
          <polygon
              className="l" 
              points="244,254 243,257 245,263 244,270 244,273 235,277 234,274 230,273 
              226,275 227,280 225,292 220,298 215,297 213,302 232,308 241,316 243,322 
              263,310 261,296 264,293 262,287 266,283 266,275 261,274 260,269 256,266 
              256,263 254,255"
          />
          <polygon 
              className="w" 
              points="244,270 244,273 256,266 256,263 "
          />
          <text x="237" y="285">Kie</text>
        </g>
        <g>
        <title>Livonia</title>
          <polygon
              className="l" 
              points="369,202 365,204 368,210 372,213 373,221 377,227 373,229 366,228 
              359,220 349,229 347,243 354,251 356,261 362,260 367,265 365,281 372,283 
              379,290 389,285 392,278 404,275 405,239 409,228 405,217 394,205 382,206 
              372,205"
          />
          <text x="365" y="250">Lvn</text>
        </g>
        <g>
        <title>Marseilles</title>
          <polygon
              className="l" 
              points="142,417 149,403 157,397 168,395 173,396 178,390 178,381 194,382 
              197,385 203,379 207,386 204,390 207,396 201,399 204,402 203,410 211,416 
              198,421 188,422 176,417 169,412 158,418 158,425 154,427"
          />
          <text x="173" y="412">Mar</text>
        </g>
        <g>
        <title>Moscow</title>
          <polygon
              className="l" 
              points="609,117 598,132 573,143 564,159 534,164 515,169 489,184 476,183 
              458,194 456,207 457,210 451,213 447,209 439,211 428,225 421,229 409,228 
              405,239 404,275 392,278 389,285 379,290 386,309 390,306 456,292 468,295 
              477,289 494,295 505,280 516,286 526,287 533,283 549,284 554,304 564,305 
              569,321 597,330 609,330"
          />
          <text x="460" y="265">Mos</text>
        </g>       
        <g>
        <title>Munich</title>
          <polygon
              className="l" 
              points="234,366 243,370 246,369 250,371 267,368 271,370 269,362 275,362 
              281,356 276,346 268,343 264,329 266,325 278,326 288,321 284,314 288,305 
              263,310 243,322 237,322 219,344 211,346 213,352 209,363 222,365 225,362 
              232,363"
          />
          <text x="235" y="360">Mun</text>
        </g> 
        <g>
        <title>Naples</title>
          <polygon
              className="l" 
              points="271,464 276,474 290,487 294,502 289,511 290,514 295,515 308,500 
              311,491 304,484 293,481 279,458"
          />
          <text x="293" y="493">Nap</text>
        </g> 
        <g>
        <title>North_Africa</title>
          <polygon
              className="l" 
              points="203,520 179,515 169,518 150,511 117,509 106,511 99,515 89,512 
              84,518 79,520 68,516 68,511 64,514 46,509 42,502 41,494 37,495 33,496 
              17,518 0,520 0,559 195,559 197,527"
          />
          <text x="130" y="536">Naf</text>
        </g> 
        <g>
        <title>Norway</title>
          <polygon
              className="l" 
              points="397,48 391,47 395,41 394,38 384,33 382,40 380,33 377,31 374,38 
              371,33 366,42 366,33 362,33 357,39 343,44 324,54 320,64 310,75 309,84 
              303,86 292,111 277,132 269,134 264,142 258,141 236,154 237,160 233,167 
              231,180 233,186 229,192 231,201 241,209 246,210 266,201 270,193 275,203 
              279,204 287,177 285,170 290,164 292,133 301,132 300,126 309,115 308,104 
              311,101 324,71 332,74 330,64 341,65 342,61 346,54 355,62 369,61 370,49 
              379,48 388,54 386,58 388,61"
          />
          <text x="250" y="175">Nwy</text>
        </g> 
        <g>
        <title>Paris</title>
          <polygon
              className="l" 
              points="146,365 149,372 156,374 165,365 185,344 188,332 172,328 165,331 
              159,331 148,329 146,337"
          />
          <text x="155" y="358">Par</text>
        </g> 
        <g>
        <title>Picardy</title>
          <polygon
              className="l" 
              points="169,311 153,315 155,320 150,319 148,329 159,331 165,331 172,328 
              188,332 192,323 184,315"
          />
          <text x="168" y="326">Pic</text>
        </g> 
        <g>
        <title>Piedmont</title>
          <polygon
              className="l" 
              points="207,386 204,390 207,396 201,399 204,402 203,410 211,416 222,410 
              233,415 236,411 233,404 246,392 243,388 229,385 227,390 221,385 213,387"
          />
          <text x="215" y="408">Pie</text>
        </g> 
        <g>
        <title>Portugal</title>
          <polygon
              className="l" 
              points="32,396 30,406 17,427 14,427 10,433 13,440 15,441 12,450 13,454 
              8,462 19,469 27,468 36,457 34,447 40,441 37,431 42,432 52,412 61,411 
              62,407 55,400 42,399 43,395"
          />
          <text x="26" y="420">Por</text>
        </g> 
        <g>
        <title>Prussia</title>
          <polygon
              className="l" 
              points="347,243 347,248 348,254 344,262 337,264 334,273 328,274 326,265 
              314,266 307,273 294,275 292,290 297,296 296,300 320,303 324,299 326,292 
              341,287 345,289 359,286 365,281 367,265 362,260 356,261 354,251"
          />
          <text x="335" y="283">Pru</text>
        </g> 
        <g>
        <title>Rome</title>
          <polygon
              className="l" 
              points="247,442 248,447 256,458 271,464 279,458 280,455 279,451 274,447 
              263,434 250,438"
          />
          <text x="257" y="452">Rom</text>
        </g> 
        <g>
        <title>Ruhr</title>
          <polygon
              className="l" 
              points="213,302 210,313 208,315 210,326 205,331 204,338 211,346 219,344 
              237,322 243,322 241,316 232,308"
          />
          <text x="215" y="330">Ruh</text>
        </g> 
        <g>
        <title>Rumania</title>
          <polygon
              className="l" 
              points="403,360 404,371 394,376 395,382 401,385 406,396 401,402 387,402 
              367,406 365,412 367,421 370,425 375,423 382,427 390,425 398,427 404,422 
              410,420 422,420 430,423 432,409 439,404 438,397 427,399 422,382 423,376 
              414,372 411,361"
          />
          <text x="390" y="415">Rum</text>
        </g> 
        <g>
        <title>Serbia</title>
          <polygon
              className="l" 
              points="365,412 360,413 342,410 338,412 335,410 332,410 330,416 331,424 
              327,429 330,437 337,446 346,452 346,466 350,471 356,471 361,467 369,464 
              365,461 371,456 366,439 371,438 368,433 365,425 367,421"
          />
          <text x="350" y="450">Ser</text>
        </g> 
        <g>
        <title>Sevastopol</title>
          <polygon
              className="l" 
              points="438,397 446,378 459,375 461,377 459,379 465,383 476,381 478,383 
              472,385 468,392 477,396 477,401 486,404 488,397 494,396 497,392 507,389 
              506,384 494,387 485,378 503,364 526,351 527,354 514,365 517,371 520,371 
              515,384 511,383 510,386 517,393 528,394 554,406 567,408 573,417 570,427 
              589,442 594,439 603,441 609,440 609,330 597,330 569,321 564,305 554,304 
              549,284 533,283 526,287 516,286 505,280 494,295 477,289 468,295 470,303 
              466,307 460,345 445,350 434,360 432,372 423,376 422,382 427,399"
          />
          <text x="540" y="350">Sev</text>
        </g> 
        <g>
        <title>Silesia</title>
          <polygon
              className="l" 
              points="288,321 297,322 311,334 314,332 321,339 325,340 329,338 333,330 
              326,327 323,322 320,303 296,300 288,305 284,314"
          />
          <text x="304" y="325">Sil</text>
        </g> 
        <g>
        <title>Smyrna</title>
          <polygon
              className="l" 
              points="417,489 420,495 417,498 417,507 423,510 427,524 435,523 435,530 
              441,526 447,528 453,534 464,531 466,521 475,520 485,528 491,530 505,526 
              511,514 520,517 527,508 530,509 536,494 545,486 555,484 563,479 562,471 
              556,467 555,460 546,462 531,460 508,480 501,482 490,480 473,491 466,491 
              452,495 432,493 423,487"
          />
          <text x="460" y="510">Smy</text>
        </g> 
        <g>
        <title>Spain_(nc)</title>
          <polyline
              className="l" 
              points="134,417 123,412 113,407 112,399 101,396 96,397 72,384 59,381 54,375 
              48,374 46,378 39,375 33,381 35,384 32,396 43,395 42,399 55,400 62,407 61,411 
              52,412 42,432 37,431 40,441"
          />
        </g> 
        <g>
        <title>Spain_(sc)</title>
          <polyline
              className="l" 
              points="40,441 34,447 36,457 27,468 33,475 34,484 37,490 47,488 52,489 
              60,486 78,491 83,494 86,485 90,483 98,484 107,474 113,473 115,469 110,461 
              124,444 131,439 146,438 157,432 158,425 154,427 142,417 135,414 134,417 
              123,412"
          />
          <text x="85" y="450">Spa</text>
        </g> 
        <g>
        <title>St_Petersburg_(nc)</title>
          <polyline
              className="l" 
              points="534,164 564,159 573,143 598,132 609,117 609,0 540 0 535,9 530,6 
              517,19 516,33 513,38 513,23 507,20 505,26 499,33 492,48 495,58 488,60 
              479,57 477,55 481,50 473,43 466,45 472,62 478,66 478,74 472,72 468,74 
              457,91 469,100 467,106 462,109 444,101 442,110 447,115 454,119 452,122 
              434,118 426,103 426,94 414,88 412,83 445,84 457,79 459,66 453,61 417,47 
              405,49 401,45 397,48 388,61 387,68 393,73 392,92 401,110 402,118 410,130 
              414,147"
          />
          <text x="460" y="149">Stp</text>
        </g> 
        <g>
        <title>St_Petersburg_(sc)</title>
          <polyline
              className="l" 
              points="414,147 410,152 412,161 402,177 403,183 411,184 414,187 408,187 400,192 
              399,197 387,196 371,198 369,202 372,205 382,206 394,205 405,217 409,228 421,229 
              428,225 439,211 447,209 451,213 457,210 456,207 458,194 476,183 489,184 515,169 
              534,164 564,159"
          />
        </g> 
        <g>
        <title>Sweden</title>
          <polygon
              className="l" 
              points="275,203 277,218 276,224 282,236 279,240 279,243 282,253 289,254 294,245 
              305,244 312,229 311,220 314,209 322,206 328,203 331,193 326,183 320,182 321,161 
              330,146 343,138 351,128 347,121 349,112 355,104 362,107 356,71 342,61 341,65 
              330,64 332,74 324,71 311,101 308,104 309,115 300,126 301,132 292,133 290,164 
              285,170 287,177 279,204"
          />
          <text x="300" y="160">Swe</text>
        </g> 
        <g>
        <title>Syria</title>
          <polygon
              className="l" 
              points="530,509 536,494 545,486 555,484 563,479 584,478 609,493 609,559 528,559 
              532,535 526,530 525,518"
          />
          <text x="570" y="535">Syr</text>
        </g> 
        <g>
        <title>Trieste</title>
          <polygon
              className="l" 
              points="276,399 275,403 278,410 282,401 286,402 289,418 306,436 331,454 
              330,445 337,446 330,437 327,429 331,424 330,416 332,410 323,408 321,398 
              311,394 308,383 299,385 294,380 289,385 276,386 279,389"
          />
          <text x="305" y="425">Tri</text>
        </g> 
        <g>
        <title>Tunis</title>
          <polygon
              className="l" 
              points="232,559 234,551 232,544 225,535 231,531 236,524 233,523 224,527 
              223,518 218,516 212,517 208,521 203,520 197,527 195,559"
          />
          <text x="210" y="555">Tun</text>
        </g> 
        <g>
        <title>Tuscany</title>
          <polygon
              className="l" 
              points="233,415 238,431 247,442 250,438 263,434 253,418 246,416 240,415 
              236,411"
          />
          <text x="240" y="425">Tus</text>
        </g> 
        <g>
        <title>Tyrolia</title>
          <polygon
              className="l" 
              points="234,366 243,370 246,369 250,371 267,368 271,370 269,362 275,362 
              281,356 292,357 295,362 294,380 289,385 276,386 268,385 259,388 255,394 
              250,397 246,392 243,388 245,384 241,378 234,374"
          />
          <text x="255" y="380">Tyr</text>
        </g> 
        <g>
        <title>Ukraine</title>
          <polygon
              className="l" 
              points="383,327 385,332 399,338 404,354 403,360 411,361 414,372 423,376 
              432,372 434,360 445,350 460,345 466,307 470,303 468,295 456,292 390,306 
              386,309"
          />
          <text x="420" y="340">Ukr</text>
        </g> 
        <g>
        <title>Venice</title>
          <polygon
              className="l" 
              points="278,443 272,424 260,417 261,401 270,398 276,399 279,389 276,386 
              268,385 259,388 255,394 250,397 246,392 233,404 236,411 240,415 246,416 
              253,418 263,434 274,447"
          />
          <text x="245" y="407">Ven</text>
        </g> 
        <g>
        <title>Vienna</title>
          <polygon
              className="l" 
              points="292,357 295,349 303,346 316,348 322,347 329,346 337,350 335,354 
              322,370 311,375 308,383 299,385 294,380 295,362"
          />
          <text x="302" y="370">Vie</text>
        </g> 
        <g>
        <title>Warsaw</title>
          <polygon
              className="l" 
              points="333,330 326,327 323,322 320,303 324,299 326,292 341,287 345,289 
              359,286 365,281 372,283 379,290 386,309 383,327 379,324 374,327 367,329 
              361,324 356,323 353,327 344,332 341,330"
          />
          <text x="350" y="304">War</text>
        </g> 
        <MapBuilder/>
      </svg>
    );
  }

}

export default Map;
