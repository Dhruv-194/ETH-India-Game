import {
    setCustomProperty,
    incrementCustomProperty,
    getCustomProperty,
  } from "./updateCustomProperty.js"
  
  const SPEED = 0.05
  const OBSTACLE_INTERVAL_MIN = 500
  const OBSTACLE_INTERVAL_MAX = 2000
  const gameElem = document.querySelector("[data-game]")
  
  let nextNFTTime
  export function setupNft() {
    // spawn an obstacle quickly once the game starts
    nextNFTTime = OBSTACLE_INTERVAL_MIN
    // remove all obstacles before the game starts again
    document.querySelectorAll("[data-nft]").forEach(nft => {
      nft.remove()
    })
  }
  
  export function updateNft(delta, speedScale) {
    document.querySelectorAll("[data-nft]").forEach(nft => {
      incrementCustomProperty(nft, "--left", delta * speedScale * SPEED * -1)
      if (getCustomProperty(nft, "--left") <= -100) {
        nft.remove()
      }
    })
  
    if (nextNFTTime <= 0) {
        createNft()
      nextNFTTime =
        randomNumberBetween(OBSTACLE_INTERVAL_MIN, OBSTACLE_INTERVAL_MAX) / speedScale
    }
    nextNFTTime -= delta
  }
  
  export function getNftRects() {
    return [...document.querySelectorAll("[data-nft]")].map(nft => {
      return nft.getBoundingClientRect()
    })
  }
  
  function createNft() {
    var items = [1,2,3]
    var item = items[Math.floor(Math.random()*items.length)]
    const nft = document.createElement("img")
    nft.dataset.nft = true
    // todo: set img drugo nft
    if(item==1){
        nft.src = "imgs/nft1.png"
        nft.classList.add("nft")
    }else if(item==2){
        nft.src = "imgs/nft2.png"
        nft.classList.add("nft1")
    }
    else if(item==3){
        nft.src = "imgs/nft3.png"
        nft.classList.add("nft")
    }
    // todo: smeni klasa nft
    nft.classList.add("nft")
    setCustomProperty(nft, "--left", 100)
    gameElem.append(nft)
  }
  
  function randomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }